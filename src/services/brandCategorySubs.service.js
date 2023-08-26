import axios from "axios";
import {API_URL} from "../common/config/config";

export const fetchBrandsCategoriesSubs = async () => {
    try {
        const response = await axios.get(`${API_URL}/brands-categories-subs`);
        if (response.data) {
            localStorage.setItem('brandsCategoriesSubs', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error('brandsCategoriesSubs', error);
        throw error;
    }
};
