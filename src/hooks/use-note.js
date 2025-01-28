import getNote from '../api/get/get-note';
import { useState, useEffect } from 'react';

export default function useNote(noteId) {
    const [note, setNote] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getNote(noteId)
            .then((note) => {
                setNote(note);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [noteId]);

    return { note, setNote, isLoading, error };
}
