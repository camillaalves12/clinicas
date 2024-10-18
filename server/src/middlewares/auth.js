import { verify } from "jsonwebtoken";

export function AuthMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, "secret");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}
