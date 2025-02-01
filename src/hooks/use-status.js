import { useEffect, useState } from 'react';
import getUser from '../api/get/get-user';

export default function useStatus(userId) {
    const [isAdminOrSuper, setIsAdminOrSuper] = useState(false);

    useEffect(() => {
        if (userId) {
            getUser(userId)
                .then((user) => {
                    if (user.is_superuser == true || user.is_staff == true) {
                        setIsAdminOrSuper(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else return
    }, [userId]);

    return { isAdminOrSuper };
}
