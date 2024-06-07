import bcrypt from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = (password: string) => {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);

export function parseAuction(data: { _doc: any; basePrice: any }) {
  return { ...data._doc, basePrice: parseFloat(String(data.basePrice)) };
}
