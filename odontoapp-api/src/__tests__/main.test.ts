import { expect, describe, beforeEach, afterEach, it } from 'vitest';
import request from 'supertest';
import express from 'express';
import Server from '@/server';

const app = express();
const server = new Server({ app, port: 4444 });

describe('GET /', () => {
  beforeEach(() => {
    server.init();
  });

  afterEach(() => {
    server.close();
  });

  it('should return status 200', async () => {
    const response = await request(server.app).get('/');

    expect(response.status).toEqual(200);
  });
});
