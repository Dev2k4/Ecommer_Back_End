const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return access_token;
};

const generalRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "365d" }
  );
  return refreshToken;
};

const refreshTokenJwtService = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const access_token = await generalAccessToken({
      id: user?.id,
      isAdmin: user?.isAdmin,
    });
    return {
      status: "OK",
      message: "Refresh Token successful",
      access_token,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: "Authentication failed",
    };
  }
};
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
