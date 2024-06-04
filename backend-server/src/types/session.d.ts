declare global {
  namespace Express {
    interface User {
      username: string;
      email: string;
      _id?: number;
    }
  }
}

export {};
