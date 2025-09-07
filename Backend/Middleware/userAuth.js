import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      message: "Not Authorized Login Again",
      success: false,
    });
  }

  try {
    if (!req.body) {
      req.body = {};
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        message: "Not Authorized Login Again",
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

export default userAuth;
