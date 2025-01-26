import { useEffect, useState } from "react";
import getActiveWorkshops from "../api/get/get-active-workshops";

export default function useWorkshops() {
    const [workshops, setWorkshops] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        getActiveWorkshops()
        .then((workshops) => {
            setWorkshops(workshops)
            setIsLoading(false)
        })
        .catch((error) => {
            setError(error)
            setIsLoading(false)
        })
    }, [])

    return {workshops, setWorkshops, isLoading, error}
}