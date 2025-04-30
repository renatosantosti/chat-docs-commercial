import AuthUserDto from "domain/dtos/auth/user";

/**
 * This file extends the Express Request interface to include a currentUser property.
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthUserDto
    }
  }
}