import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token = async (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET);
};

export { token };
