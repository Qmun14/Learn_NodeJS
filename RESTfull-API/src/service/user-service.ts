import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { registerUserValidaton, loginUserValidation, getUserValidation, updateUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Request } from "express";
import { logger } from "../application/logging";

const register = async (request: Request) => {
  const user = validate(registerUserValidaton, request);
  // logger.info(request)
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    }
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    }
  });
}

const login = async (request: Request) => {
  const loginRequest = await validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username
    },
    select: {
      username: true,
      password: true
    }
  });

  if (!user) {
    throw new ResponseError(401, "username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "username or password wrong");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token
    },
    where: {
      username: user.username
    },
    select: {
      token: true
    }
  });
}

const get = async (username: any) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is not found!");
  }

  return user;
}

const update = async (request: Request) => {
  const user: User = validate(updateUserValidation, request);

  let data = await prismaClient.user.findUnique({
    where: {
      username: user.username
    }
  });

  if (!data) {
    throw new ResponseError(404, "user is not found");
  }

  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username
    },
    data: data,
    select: {
      username: true,
      name: true
    }
  })
}

const logout = async (username: any) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username
    }
  });

  if (!user) {
    throw new ResponseError(404, "user is not found!");
  }

  return prismaClient.user.update({
    where: {
      username
    },
    data: {
      token: null
    },
    select: {
      username: true
    }
  });
}

export default {
  register,
  login,
  get,
  update,
  logout
}