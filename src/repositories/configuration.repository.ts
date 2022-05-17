import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of } from 'rxjs';

import { ConfigService } from '@nestjs/config';
import { ClientsMap } from '@config/clients';
import { Configuration } from '@config/config';

import { RepositoryInterface } from '@interfaces/repository.interface';

import { ClientCode } from '@root/types/client-code.type';
import {
  ConfigRegistryEntity,
  ConfigRegistryType,
} from '@entities/config-registry.entity';

@Injectable()
export class ConfigurationRepository implements RepositoryInterface {
  constructor(
    @Inject('ConfigService') private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getClientConfigurations(client: ClientCode): Observable<string> {
    if (ClientsMap.has(client)) {
      const url =
        Configuration().configRegistryPath +
        ClientsMap.get(client) +
        '_' +
        ConfigRegistryType.ClientConfiguration +
        this.configService.get('CONFIG_REGISTRY_CODE');

      const articleFeedsCode = 'articleFeeds';

      const configResponse = this.httpService
        .get<Array<ConfigRegistryEntity>>(url)
        .pipe(
          map((response) => {
            const foundRegistryValue = response.data.find((configItem) =>
              configItem.key.includes(articleFeedsCode),
            ).value;
            return foundRegistryValue;
          }),
        );
      return configResponse;
    } else {
      return of('');
    }
  }
}
