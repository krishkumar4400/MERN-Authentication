import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log("after token")
    return res.json({
      message: "Token not found",
      success: false,
    });
  }

  try {
    if (!req.body) {
      req.body = {};
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      console.log("correct secret")
      req.body.userId = tokenDecode.id;
    } else {
      console.log("after")
      return res.json({
        message: "incorrect secret",
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
