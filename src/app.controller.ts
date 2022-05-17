import { Controller, Get, Query } from '@nestjs/common';
import { Configuration } from '@config/config';
import { AppService } from '@root/app.service';
import { DestinationEntity } from '@root/types/destination-entity.type';
import { ArticleObject } from '@entities/article.entity';
import { Observable } from 'rxjs';

@Controller(Configuration().baseUrl)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(Configuration().baseEndpoint)
  getPages(
    @Query('destinationEntity') client: DestinationEntity,
    @Query('pageTrail') pageTrail: string,
  ): Observable<ArticleObject> {
    return client && pageTrail
      ? this.appService.getPages(client, pageTrail)
      : this.appService.getFallback();
  }
}
