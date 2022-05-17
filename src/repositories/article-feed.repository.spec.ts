import { Test, TestingModule } from '@nestjs/testing';

import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { nullArticleObject } from '@config/null-article';

describe('ArticleFeedRepository', () => {
  let repo: ArticleFeedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArticleFeedRepository,
          useClass: ArticleFeedRepository,
        },
      ],
    }).compile();

    repo = await module.resolve<ArticleFeedRepository>(ArticleFeedRepository);
  });

  it('Should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('Should return ArticleObject without articles', () => {
    const getNullArticleObject = jest.spyOn(repo, 'getNullArticleObject');
    getNullArticleObject.mockReturnValue(nullArticleObject);
    repo.getNullArticleObject();
    expect(getNullArticleObject).toBeCalled();
    expect(getNullArticleObject).toHaveLastReturnedWith(nullArticleObject);
  });
});
