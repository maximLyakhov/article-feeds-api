import { ArticleObject } from '@entities/article.entity';
import { showMoreText, showMoreUrl } from '@config/best-buys-link';

export const nullArticleObject: ArticleObject = {
  feedCount: 0,
  showMoreUrl: showMoreUrl,
  showMoreText: showMoreText,
  articles: [],
};
