const customPaginationData = async ({ model, query = {}, page = 1, pageSize = 10, populate = '', select = '' }) => {
  try {
    // Calculate the number of documents to skip for the current page
    const skip = (page - 1) * pageSize;

    // First, perform a find query and get all matching documents (not paginated)
    const totalDocs = await model.find(query).countDocuments(); // Count total documents matching the query

    // Apply pagination (skip and limit) after the find query
    const data = await model
      .find(query)
      .populate(populate)
      .select(select)
      .skip(skip) // Skip to the current page
      .limit(pageSize); // Limit the result to pageSize

    // Calculate total pages
    const totalPages = Math.ceil(totalDocs / pageSize);

    // Pagination metadata
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const pagingCounter = skip + 1;

    return {
      docs: data, // Paginated data
      totalDocs: totalDocs, // Total number of documents matching the query
      limit: pageSize, // Page size (limit)
      totalPages: totalPages, // Total number of pages
      page: page, // Current page number
      pagingCounter: pagingCounter, // The starting index of the current page (1-based)
      hasPrevPage: hasPrevPage, // Boolean: if there is a previous page
      hasNextPage: hasNextPage, // Boolean: if there is a next page
      prevPage: prevPage, // Previous page number (if exists)
      nextPage: nextPage, // Next page number (if exists)
    };
  } catch (error) {
    logger.error(`Error during pagination: ${error}`);
    throw error;
  }
};

module.exports = customPaginationData;
