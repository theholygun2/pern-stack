// middleware/auth.middleware.js
export const protectRoute = (req, res, next) => {
  console.log("Session: ", req.session)
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized - No session or user" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if ( !req.session || !req.session.admin || !req.session.admin.id) {
    return res.status(401).json({ message: "Unautorized - No session for admin"});
  }
  next();
}
// cart middleware
//protecting routes and only routes i think