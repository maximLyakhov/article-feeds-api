import { INestApplication } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '@config/config';

import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { ArticleFeedRepository } from '@repositories/article-feed.repository';
import { ConfigurationRepository } from '@repositories/configuration.repository';
import { nullArticleObject } from '@config/null-article';

import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';

const acceptanceEnvironment = {
  NODE_ENV: 'acceptance',
  CONFIG_REGISTRY:
    'https://acceptance.gateway.jakop.cloud/configregistry-acceptance',
};

const productionEnvironment = {
  NODE_ENV: 'production',
  CONFIG_REGISTRY: 'https://uk.gateway.jakop.cloud/configregistry',
};

const endpoint = '/article-feeds';

let app: INestApplication;

describe('AppController (e2e) Acceptance', () => {
  beforeAll(async () => {
    // setting node variable to be real
    process.env = acceptanceEnvironment;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [Configuration],
        }),
        HttpModule,
      ],
      controllers: [AppController],
      providers: [
        AppService,
        ArticleFeedRepository,
        ConfigurationRepository,
        {
          provide: 'ConfigService',
          inject: [ConfigService],
          useClass: ConfigService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    await app.init();
  });

  test('Checking node environment', () => {
    expect(process.env.NODE_ENV).not.toBe('test');
  });

  it('GET ' + endpoint, () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(nullArticleObject)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('GET ' + endpoint + '?invalid_queryparams', async () => {
    const invalidParams = '?destinationEntity=beans&=root%2Ctravel%2Cescape';
    const result = await request(app.getHttpServer())
      .get(endpoint + invalidParams)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(JSON.parse(result.text)).toEqual(nullArticleObject);
  });

  it('GET ' + endpoint + '?valid_queryparams', async () => {
    const validParams =
      '?destinationEntity=mailonline&pageTrail=root%2Ctravel%2Cescape';
    const result = await request(app.getHttpServer())
      .get(endpoint + validParams)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result).not.toEqual(nullArticleObject);
  });
});

describe('AppController (e2e) Production', () => {
  beforeAll(async () => {
    // setting node variable to be real
    process.env = productionEnvironment;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [Configuration],
        }),
        HttpModule,
      ],
      controllers: [AppController],
      providers: [
        AppService,
        ArticleFeedRepository,
        ConfigurationRepository,
        {
          provide: 'ConfigService',
          inject: [ConfigService],
          useClass: ConfigService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    await app.init();
  });

  test('Checking node environment', () => {
    expect(process.env.NODE_ENV).not.toBe('test');
  });

  it('GET ' + endpoint, () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(nullArticleObject)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('GET ' + endpoint + '?invalid_queryparams', async () => {
    const invalidParams = '?destinationEntity=beans&=root%2Ctravel%2Cescape';
    const result = await request(app.getHttpServer())
      .get(endpoint + invalidParams)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(JSON.parse(result.text)).toEqual(nullArticleObject);
  });

  it('GET ' + endpoint + '?valid_queryparams', async () => {
    const validParams =
      '?destinationEntity=mailonline&pageTrail=root%2Ctravel%2Cescape';
    const result = await request(app.getHttpServer())
      .get(endpoint + validParams)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result).not.toEqual(nullArticleObject);
  });
});
