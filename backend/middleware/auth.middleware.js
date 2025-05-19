// middleware/auth.middleware.js
export const protectRoute = (req, res, next) => {
  console.log("SESSION?", req.session)
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized - No session user" });
    } 
    next();
};
// cart middleware
//protecting routes and only routes i think