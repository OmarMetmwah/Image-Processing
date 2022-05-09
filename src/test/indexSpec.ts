import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

describe('Test Image Processing Functions', () => {
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
    expect(response.body.err).toBe('You must provide width');
  });

  it('test api if height parameter is missing', async () => {
    const response = await request.get('/api/image?filename=name&width=150');
    expect(response.body.err).toBe('You must provide height');
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
