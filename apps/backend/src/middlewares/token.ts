import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const VerifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['saroj-x-access-token'];
  if (!token) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Access Token is Required' });
  }
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return handleExpiredToken(req, res, next);
      }
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Invalid access token' });
    }
    next();
  });
};

const handleExpiredToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies['saroj-x-refresh-token'];

  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Refresh token is required' });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ email: decoded.email }, JWT_SECRET, {
      expiresIn: '5m',
    });
    res.cookie('saroj-x-access-token', newAccessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    next();
  });
};
