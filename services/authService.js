const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./configs/prod.env" });
} else {
  dotenv.config({ path: "./configs/dev.env" });
}
exports.generateToken = (payload) => {
  return jwt.sign(
    { mssv: payload.mssv, role: payload.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "3600s",
    }
  );
};
