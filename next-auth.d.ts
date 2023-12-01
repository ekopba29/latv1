import { JWT, Session, User } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    actkn: string;
    user: {
      id: string;
      email: String;
      name: string;
    } & Session["user"];
  }
  interface User {
    user: Session["user"];
    actkn: string;
  }
  interface JWT {
    actkn: string;
  }
}
