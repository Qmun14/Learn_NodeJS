import { afterEach, beforeEach, describe, it, expect } from "@jest/globals";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "./test-util";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/v1/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new address', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/v1/contacts/' + testContact?.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "indonesia",
        postal_code: "234234"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("234234");
  });

  it('should reject create new address if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/v1/contacts/' + testContact?.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: ""
      });

    expect(result.status).toBe(400);
  });

  it('should reject create new address if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/v1/contacts/' + (testContact!.id + 1) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: ""
      });

    expect(result.status).toBe(404);
  });
});

describe('GET /api/v1/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + testContact?.id + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test')

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("234234");
  })

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + (testContact?.id) + 1 + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test')

    expect(result.status).toBe(404);
  })

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + testContact?.id + '/addresses/' + (testAddress?.id) + 1)
      .set('Authorization', 'test')

    expect(result.status).toBe(404);
  })

});

describe('PUT /api/v1/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update address', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + testContact?.id + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "11111"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress?.id);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("provinsi");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("11111");
  });

  it('should reject update if request is not valid', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + testContact?.id + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "",
        postal_code: ""
      });

    expect(result.status).toBe(400);
  });
  it('should reject update if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + testContact?.id + '/addresses/' + (testAddress?.id) + 1)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "1231232"
      });

    expect(result.status).toBe(404);
  });
  it('should reject update if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/v1/contacts/' + (testContact?.id) + 1 + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postal_code: "1231232"
      });

    expect(result.status).toBe(404);
  });

});

describe('DELETE /api/v1/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can remove address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/v1/contacts/' + testContact?.id + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  })
  it('should reject remove if address is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/v1/contacts/' + testContact?.id + '/addresses/' + (testAddress?.id) + 1)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  })
  it('should reject remove if contact is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/v1/contacts/' + (testContact?.id) + 1 + '/addresses/' + testAddress?.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

});

describe('GET /api/v1/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can list address', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + testContact?.id + '/addresses')
      .set('Authorization', 'test');

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);

  });

  it('should reject request list address if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/v1/contacts/' + (testContact?.id) + 1 + '/addresses')
      .set('Authorization', 'test');

    logger.info(result);

    expect(result.status).toBe(404);

  });
});
