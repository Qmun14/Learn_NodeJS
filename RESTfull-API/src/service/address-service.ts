import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../application/database';
import { validate } from '../validation/validation';
import { getContactValidation } from '../validation/contact-validation';
import { ResponseError } from '../error/response-error';
import { createAddressValidation, getAddressValidation, updateAddressValidation } from '../validation/address-validation';

const checkContactMustExist = async (user: any, contactId: number) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return contactId
}


const create = async (user: any, contactId: number, request: any) => {
  contactId = await checkContactMustExist(user, contactId);

  const address = validate(createAddressValidation, request);
  address.contact_id = contactId

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  });

}

const get = async (user: any, contactId: number, addressId: number) => {
  contactId = await checkContactMustExist(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  })

  if (!address) {
    throw new ResponseError(404, "address is not found");
  }

  return address;
}

const update = async (user: any, contactId: number, request: any) => {
  contactId = await checkContactMustExist(user, contactId);
  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    }
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "address is not found")
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  })
}

const remove = async (user: any, contactId: number, addressId: number) => {
  contactId = await checkContactMustExist(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    }
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "address is not found")
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    }
  });
}

const list = async (user: any, contactId: number) => {
  contactId = await checkContactMustExist(user, contactId);

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  });
}

export default {
  create,
  get,
  update,
  remove,
  list
}