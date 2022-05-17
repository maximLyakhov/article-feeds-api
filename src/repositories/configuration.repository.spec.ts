import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { ConfigurationRepository } from '@repositories/configuration.repository';
import { ClientsMap } from '@config/clients';

describe('ConfigurationRepository', () => {
  let repo: ConfigurationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: ConfigurationRepository,
          useClass: ConfigurationRepository,
        },
        {
          provide: 'ConfigService',
          inject: [ConfigService],
          useClass: ConfigService,
        },
      ],
    }).compile();

    repo = await module.resolve<ConfigurationRepository>(
      ConfigurationRepository,
    );
  });

  it('Should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('getClientConfigurations should be called', async () => {
    const getNullArticleObject = jest.spyOn(repo, 'getClientConfigurations');
    const clientId = ClientsMap.get('mailonline');

    repo.getClientConfigurations(clientId).subscribe();

    expect(getNullArticleObject).toBeCalled();
  });
});
