import axios from "axios";
import {API_URL} from "../common/config/config";



export const getSeasonalPromotions = async () => {
    return await axios.get(`${API_URL}/featured/products`);
};
