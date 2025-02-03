import { useEffect, useState } from 'react';
import getUser from '../api/get/get-user';

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [userError, setUserError] = useState();

    useEffect(() => {
        getUser(userId)
            .then((user) => {
                setUser(user);
            })
            .catch((error) => {
                setUserError(error);
            });
    }, [userId]);

    return { user, userError };
}