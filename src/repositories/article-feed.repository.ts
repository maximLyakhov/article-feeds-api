import { Injectable, Scope } from '@nestjs/common';

import { ParsedRegistryConfig } from '@interfaces/parsed-registry-config.interface';
import { RepositoryInterface } from '@interfaces/repository.interface';
import { ArticleObject } from '@entities/article.entity';
import {
  ConfigTrails,
  PageTrail,
  PageTrails,
} from '@root/types/page-trail.type';
import { nullArticleObject } from '@config/null-article';

@Injectable({ scope: Scope.REQUEST })
export class ArticleFeedRepository implements RepositoryInterface {
  getArticleObject(
    registryValue: string,
    pageTrails: PageTrails,
  ): ArticleObject {
    const parsedRegistryConfig: ParsedRegistryConfig =
      JSON.parse(registryValue);

    let validTrails = new Set<string>();

    Object.keys(parsedRegistryConfig).forEach((key) => {
      const registryKeyTrail: ConfigTrails = key.split(',');

      const tempValidTrails = new Set<string>();

      pageTrails.forEach((pageTrail: PageTrail) => {
        if (registryKeyTrail.includes(pageTrail)) {
          tempValidTrails.add(pageTrail);
        }
      });

      if (
        tempValidTrails.size > validTrails.size &&
        parsedRegistryConfig[this.joinTrails(tempValidTrails)]
      ) {
        validTrails = tempValidTrails;
      }
    });

    const bestMatch: ArticleObject =
      parsedRegistryConfig[this.joinTrails(validTrails)];

    if (bestMatch) {
      bestMatch.feedCount = bestMatch.articles.length;
      return bestMatch;
    } else {
      return nullArticleObject;
    }
  }

  getNullArticleObject(): ArticleObject {
    return nullArticleObject;
  }

  joinTrails(trails: Set<string>): string {
    return [...trails].join();
  }
}
