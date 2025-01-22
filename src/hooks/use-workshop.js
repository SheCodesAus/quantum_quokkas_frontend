import getWorkshop from '../api/get/get-workshop';
import { useState, useEffect } from 'react';

export default function useWorkshop(workshopId) {
    const [workshop, setWorkshop] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getWorkshop(workshopId)
            .then((workshop) => {
                setWorkshop(workshop);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [workshopId]);

    return { workshop, isLoading, error };
}
