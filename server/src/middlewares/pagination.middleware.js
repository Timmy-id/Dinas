const Pagination = (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;

  req.pagination = { limit, offset, page };
  next();
};

module.exports = Pagination;
