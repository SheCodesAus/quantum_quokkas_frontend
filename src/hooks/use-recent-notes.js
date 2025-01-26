import { useEffect, useState } from 'react';
import getRecentNotes from '../api/get/get-recent-notes';

export default function useRecentNotes() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getRecentNotes()
            .then((notes) => {
                setNotes(notes);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return { notes, isLoading, error };
}
