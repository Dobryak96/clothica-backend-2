import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";
import bcrypt from "bcrypt";
import { Session } from "../../models/session.js";
import { createSession, setSessionCookies } from "../../services/auth.js";

export const loginUser = async (req, res) => {
  const { phone, password } = req.body || {};

  if (
    typeof phone !== "string" ||
    typeof password !== "string" ||
    !phone.trim() ||
    !password
  ) {
    throw createHttpError(400, "Phone and password are required");
  }

  const user = await UserModel.findOne({ phone });
  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, "Invalid credentials");
  }
  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};
