import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const passwordUtil = Object.freeze({ hashPassword, comparePassword });

export type IPasswordUtil = typeof passwordUtil;
