import { ArticleObject } from '@entities/article.entity';

export interface ParsedRegistryConfig {
  [key: string]: ArticleObject;
}
