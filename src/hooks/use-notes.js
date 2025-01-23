import { useEffect, useState } from 'react';
import getNotes from '../api/get/get-notes';

export default function useNotes() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getNotes()
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
