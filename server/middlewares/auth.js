// server/middlewares/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const auth = req.headers.authorization?.split(' ');
  if (!auth || auth[0] !== 'Bearer') 
    return res.status(401).json({ message: '토큰이 없습니다.' });
  try {
    const payload = jwt.verify(auth[1], process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
}
