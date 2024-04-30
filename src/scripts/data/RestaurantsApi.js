import CONFIG from "../globals/config.js";

const RestaurantsApi = {
  _endPoint: CONFIG.RESTAURANT_ENDPOINT.endsWith("/") ? CONFIG.RESTAURANT_ENDPOINT.slice(0, -1) : CONFIG.RESTAURANT_ENDPOINT,

  async getAllData() {
    return fetch(`${RestaurantsApi._endPoint}/list`)
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
        throw error;
      });
  },

  async getDetailById(id) {
    return fetch(`${RestaurantsApi._endPoint}/detail/${id}`)
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
        throw error;
      });
  },

  async getByKeyword(keyword) {
    return fetch(`${RestaurantsApi._endPoint}/search?q=${keyword}`)
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
        throw error;
      });
  },

  async addReview({
    id: reviewId,
    name: reviewerName,
    review: reviewMsg,
  }) {
    const datas = {
      id: reviewId,
      name: reviewerName,
      review: reviewMsg,
    };

    if (!reviewId || !reviewerName || !reviewMsg) {
      throw new Error(
        "Missing param addReview(?): review kosong! harap isi review",
      );
    }
    if (typeof datas !== "object") {
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
      throw error;
    });
  },

  getImageResolutionUrl({ resolution, pictureId }) {
    if (!resolution || !pictureId) {
      throw new Error("Parameter tidak boleh kosong { resolution, pictureId }");
    }
    const resolutionUrl = {
      small: `https://restaurant-api.dicoding.dev/images/small/${pictureId}`,
      medium: `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`,
      large: `https://restaurant-api.dicoding.dev/images/large/${pictureId}`,
    };
    const result = () => {
      if (resolutionUrl[resolution]) {
        return resolutionUrl[resolution];
      }
      console.error("resolusi yang kamu inginkan tidak ada. berikut adalah resolusi yang tersedia [small, medium, large]");
      return false;
    };
    return result();
  },
};

export { RestaurantsApi };
