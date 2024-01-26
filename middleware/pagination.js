export const paginationMiddleware = (defaultPerPage = 10) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page ? req.query.page.toString() : "1");
    const perPage = parseInt(req.query.perPage) || defaultPerPage;
    const skip = (page - 1) * perPage;

    req.pagination = {
      page,
      perPage,
      skip,
    };

    next();
  };
};
