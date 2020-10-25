/**
 *  Pagination
 *  @method getPagination
 *  @param
 */
export const getPagination = (total: number, skip: number, limit: number) => {
    return new Promise((resolve, reject) => {
        resolve({
            totalItems: total,
            skip: skip,
            limit: limit,
            totalPages: Math.ceil(total / limit),
            currentPage: total === 0 ? 0 : Math.ceil(skip / limit) + 1,
        });
    });
}