import axios from "axios";
import {API_URL} from "../common/config/config";

export const getBrand = async (slug) => await axios.get(`${API_URL}/brand/${slug}`);