export default interface IPasswordHashAdapter {
  createHash: (password: string) => string | Promise<string>;
  validateHash: (
    textPlain: string,
    hashCode: string,
  ) => boolean | Promise<boolean>;
  createToken: <T>(object: T) => string | Promise<string>;
  validateToken: (
    token: string,
    secret: string,
  ) => string | any | Promise<string | any>;
  decodeToken: <T>(token: string) => T | null | Promise<T | null>;
}
