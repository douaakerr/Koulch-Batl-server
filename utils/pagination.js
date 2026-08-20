export const getPagination = (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const productsPerPage = Math.max(Number(limit) || 10, 1);

  const skip = (currentPage - 1) * productsPerPage;

  return {
    currentPage,
    productsPerPage,
    skip,
  };
};