import { useEffect, useState } from 'react';
import getNotes from '../api/get/get-notes';

export default function useOwnedNotes(username) {
    const [notes, setNotes] = useState([]);
    const [ownedNotes, setOwnedNotes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getNotes()
            .then((notes) => {
                let list = []
                for (let id = 0; id < notes.length; id++) {
                    console.log(username)
                    if (notes[id].added_by_user?.username === username) {
                        console.log(notes[id])
                    }
                    setOwnedNotes(list)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    }, []);

    return { ownedNotes, isLoading, error };
}


//     useEffect(() => {
//         getNotes()
//             .then((notes) => {
//                 setOwnedNotes(notes);
//                 let list = [];
//                 for (let id = 0; id < ownedNotes.length; id++) {
//                     if (ownedNotes[id].added_by_user.username == username) {
//                         list.push(ownedNotes[id]);
//                     }
//                     setOwnedNotes(list);
//                     setIsLoading(false);
//                 }
//             })
//             .catch((error) => {
//                 setIsLoading(false);
//                 setError(error);
//             });
//     }, []);

//     return { ownedNotes, isLoading, error };
// }
