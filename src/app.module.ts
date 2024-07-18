import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { RolesModule } from './roles/roles.module';

import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.getOrThrow('POSTGRES_DB_SETTINGS'),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TokenModule,
    RolesModule,
  ],
  providers: [],
})
export class AppModule {}
