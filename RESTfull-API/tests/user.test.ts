import { describe, it, expect, afterEach, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { createTestUser, getTestUser, removeTestUser } from './test-util';
import bcrypt from 'bcrypt';

describe('POST /api/v1/users', () => {

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(web)
      .post('/api/v1/users')
      .send({
        username: "test",
        password: "rahasia",
        name: "test"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/v1/users')
      .send({
        username: "",
        password: "",
        name: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    let result = await supertest(web)
      .post('/api/v1/users')
      .send({
        username: "test",
        password: "rahasia",
        name: "test"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web)
      .post('/api/v1/users')
      .send({
        username: "test",
        password: "rahasia",
        name: "test"
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('POST /api/v1/users/login', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/v1/users/login')
      .send({
        username: "test",
        password: "rahasia"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/v1/users/login')
      .send({
        username: "",
        password: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/v1/users/login')
      .send({
        username: "test",
        password: "salah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/v1/users/login')
      .send({
        username: "salah",
        password: "salah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/v1/users/current', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
      .get('/api/v1/users/current')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/api/v1/users/current')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/v1/users/current', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    const result = await supertest(web)
      .patch('/api/v1/users/current')
      .set('Authorization', 'test')
      .send({
        name: "Ma'mun",
        password: "rahasialagi"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Ma'mun");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user!.password)).toBe(true);
  });

  it('should can update user name', async () => {
    const result = await supertest(web)
      .patch('/api/v1/users/current')
      .set('Authorization', 'test')
      .send({
        name: "Ma'mun",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Ma'mun");
  });

  it('should can update user password', async () => {
    const result = await supertest(web)
      .patch('/api/v1/users/current')
      .set('Authorization', 'test')
      .send({
        password: "rahasialagi"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user!.password)).toBe(true);
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web)
      .patch('/api/v1/users/current')
      .set('Authorization', 'salah')
      .send({});

    expect(result.status).toBe(401);
  });
});

describe('DELETE /api/v1/users/logout', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    const result = await supertest(web)
      .delete('/api/v1/users/logout')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();
    expect(user?.token).toBeNull();
  });

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(web)
      .delete('/api/v1/users/logout')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
  });

})
