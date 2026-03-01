/**
 * Middleware to restrict access based on user roles (post)
 * @param {...string} roles - Allowed posts (e.g., 'Co Founder', 'HR Manager', 'Supervisor', 'Agent')
 */
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // req.user is set by the protect middleware
        if (!roles.includes(req.user.post)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.post} is not authorized to access this route`
            });
        }
        next();
    };
};

module.exports = { restrictTo };
