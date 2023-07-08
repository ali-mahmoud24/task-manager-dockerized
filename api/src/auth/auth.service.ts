import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestJs/mongoose';

import mongoose, { Model } from 'mongoose';
import { User } from './schema/user.schema';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto, // : Promise<{ token: string; id: string }>
  ) {
    const { firstName, lastName, email, password } = signUpDto;

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser._id });

    return { token, userId: newUser.id };
  }

  async login(
    loginDto: LoginDto, // : Promise<{ token: string; id: string }>
  ) {
    const { email, password } = loginDto;

    const loadedUser = await this.userModel.findOne({ email });
    if (!loadedUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      loadedUser.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: loadedUser._id });

    return { token, userId: loadedUser.id };
  }
}
