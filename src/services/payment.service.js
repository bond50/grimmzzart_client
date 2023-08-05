import axios from "axios";
import {API_URL} from "../common/config/config";



export const createPaymentIntent = async (token, body) => {
    return await axios.post(`${API_URL}/create-payment-intent/`, body, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

