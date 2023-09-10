import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import supertest from 'supertest';
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from './test-util';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';

describe('POST /api/v1/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new contacts', async () => {
    const result = await supertest(web)
      .post('/api/v1/contacts')
      .set('Authorization', 'test')
      .send({
        first_name: 'test',
        last_name: 'test',
        email: 'test@example.com',
        phone: '0123123232'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('test');
    expect(result.body.data.last_name).toBe('test');
    expect(result.body.data.email).toBe('test@example.com');
    expect(result.body.data.phone).toBe('0123123232');
  });
  it('should reject create new contacts if request is not valid', async () => {
    const result = await supertest(web)
      .post('/api/v1/contacts')
      .set('Authorization', 'test')
      .send({
        first_name: '',
        last_name: 'test',
        email: 'test',
        phone: '0123123232123232176726318237283167231827362716723'
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

});

describe('GET /api/v1/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContacts = await getTestContact();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + testContacts?.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContacts?.id);
    expect(result.body.data.first_name).toBe(testContacts?.first_name);
    expect(result.body.data.last_name).toBe(testContacts?.last_name);
    expect(result.body.data.email).toBe(testContacts?.email);
    expect(result.body.data.phone).toBe(testContacts?.phone);

  });

  it('should return 404 if contact id is not found', async () => {
    const testContacts = await getTestContact();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + (testContacts?.id) + 1)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);

  })
});

describe('PUT /api/v1/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update existing contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + testContact?.id)
      .set('Authorization', 'test')
      .send({
        first_name: "Ma'mun",
        last_name: "Ramdhan",
        email: "qmun@qlabs.com",
        phone: "0999988876"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact?.id);
    expect(result.body.data.first_name).toBe("Ma'mun");
    expect(result.body.data.last_name).toBe("Ramdhan");
    expect(result.body.data.email).toBe("qmun@qlabs.com");
    expect(result.body.data.phone).toBe("0999988876");

  });

  it('should reject update existing contact if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + testContact?.id)
      .set('Authorization', 'test')
      .send({
        first_name: "",
        last_name: "",
        email: "qmun.com",
        phone: ""
      });

    expect(result.status).toBe(400);

  });

  it('should reject updating existing contact if not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + (testContact?.id) + 1)
      .set('Authorization', 'test')
      .send({
        first_name: "Ma'mun",
        last_name: "Ramdhan",
        email: "qmun@qlabs.com",
        phone: "0999988876"
      });

    expect(result.status).toBe(404);

  });

});

describe('DELETE /api/v1/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete contact', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/v1/contacts/' + testContact?.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBe(null);

  });
  it('should reject delete if contact is not found', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/v1/contacts/' + (testContact!.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  })
});

describe('GET /api/v1/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can search without parameter', async () => {
    const result = await supertest(web)
      .get('/api/v1/contacts')
      .set('Authorization', 'test')

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(web)
      .get('/api/v1/contacts')
      .query({ page: 2 })
      .set('Authorization', 'test')

    logger.info(result.body)

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search using name', async () => {
    const result = await supertest(web)
      .get('/api/v1/contacts')
      .query({ name: "test 1" })
      .set('Authorization', 'test')

    logger.info(result.body)

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using email', async () => {
    const result = await supertest(web)
      .get('/api/v1/contacts')
      .query({ email: "test1" })
      .set('Authorization', 'test')

    logger.info(result.body)

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using phone', async () => {
    const result = await supertest(web)
      .get('/api/v1/contacts')
      .query({ phone: "0890000001" })
      .set('Authorization', 'test')

    logger.info(result.body)

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

})

