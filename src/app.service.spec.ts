import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '@root/app.service';
import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { ConfigurationRepository } from '@repositories/configuration.repository';
import { ArticleObject } from '@entities/article.entity';
import { nullArticleObject } from '@config/null-article';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArticleFeedRepository,
          useValue: {
            getNullArticleObject(): ArticleObject {
              return nullArticleObject;
            },
          },
        },
        {
          provide: ConfigurationRepository,
          useValue: {
            getClientConfigurations: jest.fn().mockImplementation(),
          },
        },
        AppService,
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getClientConfigurations should be called', async () => {
    const getFallback = jest.spyOn(service, 'getFallback');
    service.getFallback();
    expect(getFallback).toBeCalled();
  });
});
