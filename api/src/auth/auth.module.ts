import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { UserSchema } from './schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategey';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          // signOptions: {
          //   expiresIn: config.get<string | number>('JWT_EXPIRES'),
          // },
        };
      },
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
