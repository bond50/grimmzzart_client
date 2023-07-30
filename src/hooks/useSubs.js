// useCategories.js
import useSWR from 'swr';
import {fetchSubCategories} from "../services/sub.service";
import {API_URL} from "../common/config/config";



const useSubCategories = () => {
    // Use SWR hook to fetch and cache the sub categories data
    const {data: subs} = useSWR(`${API_URL}/subs`, fetchSubCategories);
    if (!subs) {
        return []

    }
    return subs ;
};

export default useSubCategories;
