import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltedRound = 10;
  const hash_password = await bcrypt.hash(password, saltedRound);
  return hash_password;
};

export const comparePassword = async (
  password: string,
  hash_password: string
) => {
  const compare_password = await bcrypt.compare(password, hash_password);
  return compare_password;
};
