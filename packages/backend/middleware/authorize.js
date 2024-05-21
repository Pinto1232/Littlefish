// Middleware to authorize based on user roles
const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).send('You do not have permission to perform this action');
    }
    next();
  };
};

module.exports = authorize;