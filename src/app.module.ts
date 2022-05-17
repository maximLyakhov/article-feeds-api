import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '@config/config';

import { AppService } from '@root/app.service';
import { AppController } from '@root/app.controller';

import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { ConfigurationRepository } from '@repositories/configuration.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ArticleFeedRepository,
    ConfigurationRepository,
    {
      provide: 'ConfigService',
      inject: [ConfigService],
      useClass: ConfigService,
    },
  ],
})
export class AppModule {}
