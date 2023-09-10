import { Request } from 'express'
import { User } from "@prisma/client";

export interface CustomRequest extends Request {
  user: User; // user adalah tipe data dari properti 'user'
}
