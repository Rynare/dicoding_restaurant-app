import restoJSON from '../../../public/data/DATA.json';
import CONFIG from '../../globals/config.js';

class Restaurants {
    constructor() {
        this._endPoint = CONFIG.RESTAURANT_ENDPOINT
    }

    async getAllData() {
        return fetch(`${this._endPoint}/list`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result.error) {
                    throw new Error(`JSON parse error!: ${result.message}`);
                } else {
                    return result;
                }
            })
            .catch((error) => {
                throw new Error("Error fetching restaurant list:", error);
            });
    }

    async getDetailById(id) {
        return fetch(`${this._endPoint}/detail/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result.error) {
                    throw new Error(`JSON parse error!: ${result.message}`);
                } else {
                    return result;
                }
            })
            .catch((error) => {
                throw new Error("Error fetching restaurant detail:", error);
            });

    }

    async getByKeyword(keyword) {
        return fetch(`${this._endPoint}/search?q=${keyword}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result.error) {
                    throw new Error(`JSON parse error!: ${result.message}`);
                } else {
                    return result;
                }
            })
            .catch((error) => {
                throw new Error("Error fetching restaurant detail:", error);
            });
    }

    static async addReview({
        id: reviewId,
        name: reviewerName,
        review: reviewMsg
    }) {
        const datas = {
            id: reviewId,
            name: reviewerName,
            review: reviewMsg
        }

        if (!reviewId || !reviewerName || !reviewMsg) {
            throw new Error(
                "Missing param addReview(?): review kosong! harap isi review",
            );
        }
        if (typeof datas != "object") {
            throw new Error(
                "Unmatch param addReview(data): review harus berupa object",
            );
        }
        return fetch(`${CONFIG.RESTAURANT_ENDPOINT}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json(); // Menunggu response.json()
            if (result.error) {
                throw new Error(`Error Send Review: ${result.message}`); // Perbaikan: Menggunakan result.error
            } else {
                return result;
            }
        }).catch((error) => {
            throw new Error(`Error Send Review: ${error.message}`);
        }); // Menambahkan pesan error jika fetch gagal
    }

    static getImageResolutionUrl({ resolution, pictureId }) {
        if (!resolution || !pictureId) {
            throw new Error('Parameter tidak boleh kosong { resolution, pictureId }');
        }
        const resolutionUrl = {
            small: `https://restaurant-api.dicoding.dev/images/small/${pictureId}`,
            medium: `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`,
            large: `https://restaurant-api.dicoding.dev/images/large/${pictureId}`,
        }
        const result = () => {
            if (resolutionUrl[resolution]) {
                return resolutionUrl[resolution]
            } else {
                console.error('resolusi yang kamu inginkan tidak ada. berikut adalah resolusi yang tersedia [small, medium, large]')
                return false
            }
        }
        return result()
    }
}


export { Restaurants }