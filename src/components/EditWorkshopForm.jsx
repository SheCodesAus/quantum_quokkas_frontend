import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

import Loader from './Loader';
import getWorkshops from '../api/get/get-user-workshops';
import putWorkshop from '../api/put/put-edit-workshop';
import { formatDate } from '../utils/date-formatter';

const EditWorkshop = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [editing, setEditing] = useState(false);
    const handleEditing = () => setEditing(!editing);

    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const userWorkshops = await getWorkshops(auth.firstName);
                setWorkshops(userWorkshops);
                setIsLoading(false);
                if (userWorkshops.length > 0) {
                    setSelectedWorkshop(userWorkshops[0]);
                }
            } catch (error) {
                console.error('Error fetching workshops:', error);
                setIsLoading(false);
            }
        };

        if (auth.firstName) {
            fetchWorkshops();
        }
    }, [auth.firstName]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSelectedWorkshop((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putWorkshop(selectedWorkshop, auth.token);
            navigate(0);
            setEditing(false);
        } catch (error) {
            console.error('Error updating workshop:', error);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className='space-y-4 font-main font-light'>
            <h1 className='text-xl'>Your Workshops</h1>
            {workshops.length === 0 ? (
                <p>No workshops available.</p>
            ) : (
                <>
                    <select
                        className='text-xl py-1 w-full font-accent tracking-wider border-[1px] border-green-light rounded text-center bg-green-light/30 lg:w-80 lg:ml-8'
                        onChange={(e) =>
                            setSelectedWorkshop(
                                workshops.find(
                                    (w) => w.id === Number(e.target.value)
                                )
                            )
                        }
                        value={selectedWorkshop?.id || ''}
                    >
                        {workshops.map((workshop) => (
                            <option key={workshop.id} value={workshop.id}>
                                {workshop.title}
                            </option>
                        ))}
                    </select>

                    {!editing ? (
                        // Selected Workshop Information
                        <section className='space-y-3'>
                            <p className='pl-4 lg:w-4/5'>
                                {selectedWorkshop?.description}
                            </p>
                            <h3 className='font-normal'>
                                {formatDate(selectedWorkshop?.start_date)}
                            </h3>
                            <div className='w-fit ml-auto lg:mx-auto'>
                                <button
                                    className='border-[1px] font-accent tracking-wider text-lg lg:text-2xl py-2 px-5 rounded bg-green-dark/60 shadow-md shadow-green-dark'
                                    onClick={handleEditing}
                                >
                                    Edit
                                </button>
                            </div>
                        </section>
                    ) : (
                        // Editing Workshop Form
                        <form
                            className='grid grid-cols-3 gap-y-4'
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor='title'>Title</label>
                            <input
                                className='col-span-2 p-2 rounded row-start-2'
                                onChange={handleChange}
                                type='text'
                                id='title'
                                placeholder={selectedWorkshop?.title}
                            />

                            <label
                                className='row-start-3'
                                htmlFor='description'
                            >
                                Description
                            </label>
                            <textarea
                                className='col-span-3 p-2 rounded row-start-4'
                                onChange={handleChange}
                                id='description'
                                rows={5}
                                placeholder={selectedWorkshop?.description}
                            />

                            <label className='row-start-5' htmlFor='start_date'>
                                Date
                            </label>
                            <input
                                className='p-2 rounded row-start-6'
                                onChange={handleChange}
                                type='date'
                                id='start_date'
                                value={
                                    selectedWorkshop?.start_date?.split(
                                        'T'
                                    )[0] || ''
                                }
                            />

                            {/* 
                            <div className='input-container'>
                                <label htmlFor='end_date'>End Date</label>
                                <input
                                    onChange={handleChange}
                                    type='date'
                                    id='end_date'
                                    value={
                                        selectedWorkshop?.end_date?.split(
                                            'T'
                                        )[0] || ''
                                    }
                                />
                            </div> */}

                            <div className='row-start-7 col-span-3 flex justify-evenly'>
                                <button
                                    className='py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl'
                                    type='submit'
                                >
                                    Save
                                </button>
                                <button
                                    className='py-1.5 px-3 rounded bg-green-dark/60 tracking-wide font-accent text-xl shadow-md shadow-green-dark md:text-2xl'
                                    onClick={handleEditing}
                                >
                                    Discard
                                </button>
                            </div>
                        </form>
                    )}
                </>
            )}
        </section>
    );
};

export default EditWorkshop;
