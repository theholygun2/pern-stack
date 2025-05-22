// middleware/auth.middleware.js
export const protectRoute = (req, res, next) => {
    if (!req.session.user || !req.session) {
      return res.status(401).json({ message: "Unauthorized - No session user" });
    } 
    next();
};
// cart middleware
//protecting routes and only routes i think