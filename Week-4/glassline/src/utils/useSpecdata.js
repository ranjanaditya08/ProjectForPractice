import { useEffect, useState } from "react"
import { SPECSlIST_URL } from "./constants";


const useSpecdata = () => {
    const [specsData, setSpecsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const data = await fetch(SPECSlIST_URL);
            const dataJson = await data.json();
            setSpecsData(dataJson);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    
    return {specsData, isLoading};
}

export default useSpecdata