import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import UserCollecion from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollecion.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollecion.create({
    ...payload,
    password: hashPassword,
  });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserCollecion.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
  });
};

export const refreshToken = async (payload) => {
  const session = await SessionCollection.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  })
  if (!session) {
    throw createHttpError(401, 'Session not found')
  }
  if (Date.mow() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired')
  }

  await SessionCollection.deleteOne({ id: payload.sessionId })
  
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
}

export const getUser = filter => SessionCollection.findOne(filter)

export const getSession = (filter) => SessionCollection.findOne(filter);
