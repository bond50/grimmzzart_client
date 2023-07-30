// useCategories.js
import useSWR from 'swr';
import {fetchCategories} from "../services/categories";
import {API_URL} from "../common/config/config";
import SmallLoader from "../common/Loader/SmallLoader";


const useCategories = () => {
    // Use SWR hook to fetch and cache the categories data
    const {data: categories, isLoading} = useSWR(`${API_URL}/categories`, fetchCategories);
    // if (isLoading) {
    //     return <SmallLoader/>
    // }
    if (!categories){
        return []
    }
    return categories || [];
};

export default useCategories;
