import { Request } from "express"
import { validate } from "../validation/validation"
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation"
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const create = async (user: any, request: Request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  });
}

const get = async (user: any, contactId: number) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  });

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }

  return contact;
}

const update = async (user: any, request: Request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id
    }
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
}

const remove = async (user: any, contactId: number) => {
  contactId = validate(getContactValidation, contactId);

  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId
    }
  });
}

const search = async (user: any, request: any) => {
  request = validate(searchContactValidation, request);

  // ?    1 ((page - 1) * size) = 0
  // ?    2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;


  const contacts = await prismaClient.contact.findMany({
    where: {
      username: user.username,
      AND: [
        {
          OR: [
            {
              first_name: {
                contains: request.name,
              }
            },
            {
              last_name: {
                contains: request.name
              }
            }
          ]
        },
        {
          email: {
            contains: request.email
          }
        },
        {
          phone: {
            contains: request.phone
          }
        }
      ]
    },
    take: request.size,
    skip: skip
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: [
        {
          OR: [
            {
              first_name: {
                contains: request.name,
              }
            },
            {
              last_name: {
                contains: request.name
              }
            }
          ]
        },
        {
          email: {
            contains: request.email
          }
        },
        {
          phone: {
            contains: request.phone
          }
        }
      ]
    }
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  }
}

export default {
  create,
  get,
  update,
  remove,
  search,
}