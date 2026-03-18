module.exports = (req, res, next) => {
  const userIdHeader = req.header('x-user-id');
  if (!userIdHeader) {
    const err = new Error('Missing x-user-id header');
    err.status = 401;
    return next(err);
  }
  const userId = parseInt(userIdHeader, 10);
  if (isNaN(userId)) {
    const err = new Error('Invalid x-user-id header');
    err.status = 401;
    return next(err);
  }
  req.userId = userId;
  next();
};
