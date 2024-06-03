declare module "express-session" {
  interface SessionData {
    username: string;
    email: string;
  }
}

export {};
