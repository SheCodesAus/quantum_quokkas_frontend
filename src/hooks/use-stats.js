import { useEffect, useState } from 'react';
import getStats from '../api/get/get-stats';

export default function useStats() {
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getStats()
            .then((stats) => {
                setStats(stats);
                console.log(stats)
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return { stats, isLoading, error };
}
