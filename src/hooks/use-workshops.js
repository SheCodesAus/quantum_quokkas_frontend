import { useEffect, useState } from "react";
import getWorkshops from "../api/get/get-workshops";

export default function useWorkshops() {
    const [workshops, setWorkshops] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        getWorkshops()
        .then((workshops) => {
            setWorkshops(workshops)
            setIsLoading(false)
        })
        .catch((error) => {
            setError(error)
            setIsLoading(false)
        })
    }, [])

    return {workshops, isLoading, error}
}