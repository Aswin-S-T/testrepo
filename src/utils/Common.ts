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

export const seedData = {
    devices: ['70B3D5098068', '70B3D509806A', '70B3D5098059', '70B3D5098058', '70B3D5098057', '70B3D5098056', '70B3D5098054'],
    params : ['temperature', 'pressure', 'humidity', 'CO2', 'PM1', 'PM2p5', 'PM10', 'SO2', 'NO2', 'CO', 'CO2', 'NO2', 'SO2', 'O3', 'noise', 'UV', 'rain', 'receivedTime']
}