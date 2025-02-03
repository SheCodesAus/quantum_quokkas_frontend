import { useEffect, useState } from 'react';
import getStats from '../api/get/get-stats';

export default function useStats() {
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const fetchStats = () => {
        getStats()
            .then((stats) => {
                setStats(stats);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchStats()

        const interval = setInterval(() => {
            fetchStats()
        //}, 30000) 30sec refresh
        }, 120000) //2min refresh

        return () => clearInterval(interval)
    }, []);

    return { stats, isLoading, error };
}
