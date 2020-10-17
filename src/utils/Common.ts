import path from 'path';

/**
 *  Pagination
 *  @method getPagination
 *  @param
 */
export const getPagination = (total: number, skip: number, limit: number) => {
    return new Promise((resolve, reject) => {
        resolve({
            total_items: total,
            skip: skip,
            limit: limit,
            total_pages: Math.ceil(total / limit),
            current_page: total === 0 ? 0 : Math.ceil(skip / limit) + 1,
        });
    });
}