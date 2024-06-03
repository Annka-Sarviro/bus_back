const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");

const refresh = async (req, res) => {
  const { refresh_token } = req.body;
  const accessTokenLifetime = "15m";

  if (!refresh_token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refresh_token, REFRESH_SECRET_KEY);
    const accessToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, ACCESS_SECRET_KEY, { expiresIn: accessTokenLifetime });

    res.json({
      accessToken,
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = refresh;
