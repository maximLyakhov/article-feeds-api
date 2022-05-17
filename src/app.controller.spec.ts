import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { nullArticleObject } from '@config/null-article';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getPages: jest.fn().mockImplementation(() => nullArticleObject),
            getFallback: jest.fn().mockImplementation(() => nullArticleObject),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const client = 'mailonline';
    const pageTrail = 'root%2Ctravel%2Cescape';

    it('Should return fallback object', () => {
      expect(appController.getPages(client, pageTrail)).toBe(nullArticleObject);
    });
  });
});
