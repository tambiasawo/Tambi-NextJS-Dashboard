import { DefaultUser, User } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { isAdmin: boolean };
    expires?: string;
  }
  interface User {
    _doc?: any;
  }
}
