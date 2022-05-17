export interface Article {
  /**
   * @description article title
   */
  title: string;
  /**
   * @description article url
   */
  url: string;
  /**
   * @description article image url
   */
  imgUrl: string;
  /**
   * @description article image alt text
   */
  imgAltText?: string;
}

export interface ArticleObject {
  /**
   * @description article count
   */
  feedCount: number;
  /**
   * @description follow url
   */
  showMoreUrl: string;
  /**
   * @description follow CTA
   */
  showMoreText: string;
  /**
   * @description articles array
   */
  articles: Array<Article>;
}
