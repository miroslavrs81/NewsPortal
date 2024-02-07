import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { ValidationCode } from 'src/entities/validation-code.entity';
import { sendMail } from 'src/helpers/send-mail.helper';
import { MailDataT } from 'src/types/mail-data.type';
import { RegenerateCodeDto } from './dto/regenerate-code.dto';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private mailerService: MailerService,
    @InjectRepository(ValidationCode)
    private validationCodeRepository: Repository<ValidationCode>,
  ) {}

  async register(createUserDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException(returnMessages.EmailInUse);
    }
    const preparedUser = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const newUser = await this.userRepository.save(preparedUser);
    if (newUser) {
      if (createUserDto.verifiedEmail === newUser.email) {
        await this.userRepository.update(newUser.id, {
          emailVerifiedAt: new Date(),
        });
        return this.login({
          email: createUserDto.email,
          password: createUserDto.password,
        });
      }
      this.eventEmitter.emit('user.created', newUser);
      delete newUser.password;
      return {
        user: newUser,
      };
    }
    throw new BadRequestException(returnMessages.CodeNotValid);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException(returnMessages.EmailPasswordValidation);
    }
    if (user.emailVerifiedAt === null) {
      throw new BadRequestException(returnMessages.EmailNotVerified);
    }

    const rememberMe = loginDto.rememberMe;

    if (rememberMe !== undefined) {
      await this.userRepository.update(user.id, { rememberMe });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    delete user.password;

    const expiresIn = rememberMe
      ? process.env.JWT_EXPIRATION_TIME_REMEMBER_ME
      : process.env.JWT_EXPIRATION_TIME;

    return {
      message: returnMessages.UserSuccessfullyLoggedIn,
      data: user,
      access_token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_SECRET,
        expiresIn,
      }),
    };
  }

  public async mailVerification(user: User) {
    const token = Math.random().toString(36).toUpperCase().slice(2, 8);

    const isUserVerified = await this.userRepository.findOneBy({ id: user.id });
    if (isUserVerified.emailVerifiedAt !== null) {
      throw new BadRequestException(returnMessages.UserAlreadyVerified);
    }

    const mailData: MailDataT = {
      email: user.email,
      subject: 'User verification code',
      template: 'verification-email',
      context: {
        userName: user.name,
        token,
      },
      mailerService: this.mailerService,
    };

    if (await sendMail(mailData)) {
      this.validationCodeRepository.save({ user: user, code: token });
      return { status: 'ok' };
    }
  }

  async codeVerification(codeDto: VerificationCodeDto) {
    const user = await this.userRepository.findOneBy({ email: codeDto.email });
    if (!user) {
      throw new BadRequestException(returnMessages.UserNotFound);
    }

    const userCode = await this.validationCodeRepository
      .createQueryBuilder('validation_code')
      .leftJoinAndSelect('validation_code.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('validation_code.isValid = :isValid', { isValid: true })
      .getOne();
    if (!userCode) {
      throw new BadRequestException(returnMessages.UserCodeNotFound);
    }

    if (userCode.code !== codeDto.token) {
      userCode.numberOfTries++;
      if (userCode.numberOfTries >= 3) {
        await this.validationCodeRepository.update(userCode.id, {
          isValid: false,
          numberOfTries: userCode.numberOfTries,
        });
        throw new BadRequestException(returnMessages.LimitReached);
      }
      await this.validationCodeRepository.update(userCode.id, {
        numberOfTries: userCode.numberOfTries,
      });
      throw new BadRequestException(returnMessages.BadUserCode);
    }
    await this.userRepository.update(user.id, {
      emailVerifiedAt: new Date(),
    });

    await this.validationCodeRepository.update(userCode.id, {
      numberOfTries: ++userCode.numberOfTries,
      isValid: false,
    });
    return { status: 'ok' };
  }

  public async regenerateCode(codeDto: RegenerateCodeDto) {
    const user = await this.userRepository.findOneBy({ email: codeDto.email });
    if (!user) {
      throw new BadRequestException(returnMessages.UserNotFound);
    }
    await this.validationCodeRepository.update(
      { isValid: true, user: { id: user.id } },
      { isValid: false },
    );

    return this.mailVerification(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      throw new BadRequestException(returnMessages.UserNotFound);
    }

    const resetToken = Math.random().toString(36).toUpperCase().slice(2, 8);
    await this.validationCodeRepository.save({
      user: user,
      code: resetToken,
      isValid: true,
    });

    const mailData: MailDataT = {
      email: user.email,
      subject: 'Password Reset',
      template: 'password-reset-email',
      context: {
        userName: user.name,
        resetToken,
      },
      mailerService: this.mailerService,
    };
    await sendMail(mailData);

    return { message: returnMessages.ResetTokenSent };
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const userCode = await this.validationCodeRepository.findOne({
      where: { code: token, isValid: true },
      relations: ['user'],
    });

    if (!userCode) {
      throw new BadRequestException(returnMessages.InvalidResetToken);
    }

    const newPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.userRepository.update(userCode.user.id, {
      password: newPassword,
    });

    await this.validationCodeRepository.update(userCode.id, {
      isValid: false,
    });

    return { message: returnMessages.PasswordReset };
  }
}
