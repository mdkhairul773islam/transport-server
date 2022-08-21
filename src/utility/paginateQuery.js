const paginate = {};
paginate.set = (data) => {
  const { perPage, currentPage } = data;
  const perpage = parseInt(perPage, 10) || 10;
  let currentpage = parseInt(currentPage, 10) || 1;
  if (currentpage < 1) currentpage = 1;
  const offset = (currentpage - 1) * perpage;
  return { perpage, currentpage, offset };
};
paginate.get = (data) => {
  const {
    perpage, currentpage, offset, total, result,
  } = data;
  const pagination = {};
  const { count } = total;
  const rows = result;
  pagination.total = count;
  pagination.lastPage = Math.ceil(count / perpage);
  pagination.perPage = perpage;
  pagination.currentPage = currentpage;
  pagination.from = offset;
  pagination.to = offset + rows.length;
  return pagination;
};
module.exports = paginate;
