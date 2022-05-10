import supertest from 'supertest';
import app from '../index';
import { Request, Response } from 'express';
import { imageProcess } from '../utils/imageProcess';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

describe('Test Image Processing Functions via request', () => {
  it('test api for image not in full folder so throw error', async () => {
    const response = await request.get(
      '/api/image?filename=notExist&width=150&height=150'
    );
    expect(response.body.err).toBe('File Not Found');
  });

  it('test api if name parameter is missing', async () => {
    const response = await request.get('/api/image?width=150&height=150');
    expect(response.body.err).toBe('You must provide filename');
  });

  it('test api if width parameter is missing', async () => {
    const response = await request.get('/api/image?filename=name&height=150');
    expect(response.body.err).toBe('You must provide numeric width parameter');
  });

  it('test api if height parameter is missing', async () => {
    const response = await request.get('/api/image?filename=name&width=150');
    expect(response.body.err).toBe('You must provide numeric height parameter');
  });

  it('test api if every thing wents will and image processed well', async () => {
    const response = await request.get(
      '/api/image?filename=lol&width=300&height=300'
    );
    expect(response.body.err).toBe(undefined);
  });

  it('test api if every thing wents will and image processed well', async () => {
    const response = await request.get(
      '/api/image?filename=lol&width=300&height=300'
    );
    expect(response.status).toBe(200);
  });
});

describe('Unit Test for Image Processing Functions', () => {
  it('Test resizing of existing image', (done) => {
    const res = {} as unknown as Response;
    const req = {
      query: { filename: 'lol', height: '150', width: '150' },
    } as unknown as Request;
    imageProcess(req, res, (): void => {
      console.log('finish image processing');
    });
    setTimeout(() => {
      expect(req.query.msg).toBe('Processed');
      done();
    }, 20);
  });

  it('Test resizing of non existing image', (done) => {
    const res = {} as unknown as Response;
    const req = {
      query: { filename: 'lool', height: '150', width: '150' },
    } as unknown as Request;
    imageProcess(req, res, (): void => {
      console.log('finish image processing');
    });
    setTimeout(() => {
      expect(req.query.msg).toBe('File Not Found');
      done();
    }, 20);
  });
});
