import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);
    const {name, email, _id, createdAt, updatedAt} = data

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
      data: {
          name,
          email,
          _id,
          createdAt,
          updatedAt
    },
  });
};

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body)

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('sessionId', session.id, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
      status: 200,
        message: 'Successfully logged in an user!',
        data: {
          accessToken: session.accessToken
      }
    });
};

export const refreshTokenController = async (req, res) => {
    req.cookies
}
