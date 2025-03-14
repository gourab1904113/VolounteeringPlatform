import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.decode(token); // Decode without verifying (to check expiration)
      const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp

      if (decoded.exp < currentTime) {
        console.error("Token has expired");
        localStorage.removeItem("token"); // Remove expired token
        toast.error("Session expired, please log in again.");
        return;
      }
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
