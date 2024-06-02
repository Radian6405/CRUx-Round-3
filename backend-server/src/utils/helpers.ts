import bcrypt from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = (password: string) => {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);
