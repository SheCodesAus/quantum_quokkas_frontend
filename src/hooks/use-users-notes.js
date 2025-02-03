import { useEffect, useState } from 'react';
import getUsersNotes from '../api/get/get-user-notes';

export default function useUsersNotes(userId) {
    const [usersNotes, setUsersNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getUsersNotes(userId)
            .then((notes) => {
                setUsersNotes(notes);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);
    return { usersNotes, isLoading, error };
}
