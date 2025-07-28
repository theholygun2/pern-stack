// middleware/auth.middleware.js
export const protectRoute = (req, res, next) => {
  console.log("Session: ", req.session)
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized - No session or user" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  const user = req.session.user;
  console.log(user.role)
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized - Admins only" });
  }
  next();
};

// cart middleware
//protecting routes and only routes i think