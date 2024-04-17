import restoJSON from '../../../public/data/DATA.json';

class Restaurants {
    constructor() {
        this._allData = restoJSON.restaurants;
    }

    getAllData() {
        return this._allData;
    }

    getByKeyword(keyword) {
        const results = this.getAllData().filter(restaurant => {
            const nameMatch = restaurant.name.toLowerCase().includes(keyword.toLowerCase());
            const cityMatch = restaurant.city.toLowerCase().includes(keyword.toLowerCase());
            const descriptionMatch = restaurant.description.toLowerCase().includes(keyword.toLowerCase());

            return nameMatch || cityMatch || descriptionMatch;
        });

        return results;
    }
}

export { Restaurants }