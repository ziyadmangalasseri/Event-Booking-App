const isAuthenticated = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token received:", token);
  
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Token is not valid" });
    }
  };
  