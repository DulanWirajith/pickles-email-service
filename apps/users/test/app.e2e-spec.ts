// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as request from 'supertest';
import { UsersModule } from '../src/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () =>
    request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'));
});
