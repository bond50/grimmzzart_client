import axios from "axios";
import {API_URL} from "../common/config/config";


export const getSubs = async () => await axios.get(`${API_URL}/subs`);
export const getSubsWithProducts = async () => await axios.get(`${API_URL}/subs-with-products`);

export const fetchSubCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/subs`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error fetching sub categories:', error);
        throw error;
    }
};

export const getSub = async (slug) => await axios.get(`${API_URL}/sub/${slug}`);





