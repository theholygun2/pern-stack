// middleware/auth.middleware.js
export const protectRoute = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized - No session user" });
    }
    next();
};

//protecting routes and only routes i think