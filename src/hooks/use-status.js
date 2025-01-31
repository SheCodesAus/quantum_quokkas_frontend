import { useEffect, useState } from 'react';
import getUser from '../api/get/get-user';

export default function useStatus(userId) {
    const [isAdminOrSuper, setIsAdminOrSuper] = useState(false);

    useEffect(() => {
        getUser(userId)
            .then((user) => {
                if (user.is_superuser == true || user.is_staff == true) {
                    setIsAdminOrSuper(true)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return { isAdminOrSuper };
}
