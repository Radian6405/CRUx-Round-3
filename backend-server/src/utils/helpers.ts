import bcrypt from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = (password: string) => {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);

export function parseBid(data: any) {
  return { ...data._doc, value: parseFloat(String(data.value)) };
}

export function parseAuction(data: any) {
  if (data.currentBid === undefined)
    return { ...data._doc, basePrice: parseFloat(String(data.basePrice)) };
  else {
    return {
      ...data._doc,
      basePrice: parseFloat(String(data.basePrice)),
      currentBid: {
        _id: data.currentBid._id,
        value: parseFloat(String(data.currentBid.value)),
      },
    };
  }
}
