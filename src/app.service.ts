import { Injectable } from '@nestjs/common';
import { Observable, map, of, catchError } from 'rxjs';

import { ConfigurationRepository } from '@repositories/configuration.repository';
import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { ClientCode } from '@root/types/client-code.type';
import { PageTrails } from '@root/types/page-trail.type';
import { ArticleObject } from '@entities/article.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
    private readonly articleFeedRepository: ArticleFeedRepository,
  ) {}

  getPages(client: ClientCode, pageTrail: string): Observable<ArticleObject> {
    const pageTrails: PageTrails = decodeURIComponent(pageTrail).split(',');

    return this.configurationRepository.getClientConfigurations(client).pipe(
      map((resp: string) =>
        this.articleFeedRepository.getArticleObject(resp, pageTrails),
      ),
      catchError(() => this.getFallback()),
    );
  }

  getFallback(): Observable<ArticleObject> {
    return of(this.articleFeedRepository.getNullArticleObject());
  }
}
