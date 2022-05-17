import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '@config/config';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { ConfigurationRepository } from '@repositories/configuration.repository';

import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';

describe('AppController (e2e) Acceptance', () => {
  let app: INestApplication;
  let appModule: TestingModule;

  let appService: AppService;
  let appController: AppController;
  let configService: ConfigService;
  let articleFeedRepository: ArticleFeedRepository;
  let configurationRepository: ConfigurationRepository;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
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
    }).compile();
    app = appModule.createNestApplication();
    await app.init();

    appService = appModule.get<AppService>(AppService);
    appController = appModule.get<AppController>(AppController);
    configService = appModule.get<ConfigService>(ConfigService);
    articleFeedRepository = await appModule.resolve<ArticleFeedRepository>(
      ArticleFeedRepository,
    );
    configurationRepository = appModule.get<ConfigurationRepository>(
      ConfigurationRepository,
    );
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  it('Should inject all dependencies', () => {
    expect(appService).toBeDefined();
    expect(appController).toBeDefined();
    expect(configService).toBeDefined();
    expect(articleFeedRepository).toBeDefined();
    expect(configurationRepository).toBeDefined();
  });
});
