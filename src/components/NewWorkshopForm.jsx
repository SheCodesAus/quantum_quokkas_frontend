import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postNewWorkshop from '../api/post/post-new-workshop';

function NewWorkshopForm() {
    const navigate = useNavigate();
    const [workshopData, setWorkshopData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        image_url: '',
        location: '',
        category: '',
        coding_language: '',
        organisation: '',
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setWorkshopData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [
            'title',
            'description',
            'start_date',
            'end_date',
        ];
        const isFormValid = requiredFields.every(
            (field) => workshopData[field].trim() !== ''
        );

        if (isFormValid) {
            postNewWorkshop(workshopData)
                .then((response) => {
                    navigate(`/workshop/${response.id}`);
                })
                .catch((error) => {
                    console.error('Failed to create workshop:', error);
                });
        }
    };

    return (
        <main className='min-h-screen w-fit mx-auto font-main md:ml-48 md:mt-2 lg:ml-56 lg:mt-12 xl:ml-72'>
            <h1 className='font-accent tracking-wider text-2xl text-center mb-4 lg:text-3xl'>
                Create New Workshop
            </h1>

            <form
                className='grid grid-cols-1 w-[340px] lg:text-xl md:grid-cols-2 md:w-[500px] lg:w-[600px]'
                onSubmit={handleSubmit}
            >
                {/* Title */}
                <div className='md:col-start-1 md:col-span-2 md:w-4/5'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        onChange={handleChange}
                        value={workshopData.title}
                        className='p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded w-11/12 ml-4 mb-6 md:p-3'
                    />
                </div>

                {/* Description */}
                <div className='md:col-start-1 md:col-span-2'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        onChange={handleChange}
                        value={workshopData.description}
                        rows='5'
                        className='p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded w-11/12 ml-4 mb-6 md:p-3'
                    />
                </div>

                {/* Start Date */}
                <div className='md:row-start-3 md:col-start-1'>
                    <label htmlFor='start_date'>Start</label>
                    <input
                        type='date'
                        id='start_date'
                        onChange={handleChange}
                        value={workshopData.start_date}
                        className='w-36 lg:w-44 p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded ml-4 mb-6 md:p-3'
                    />
                </div>

                {/* End Date */}
                <div className='md:row-start-3 md:col-start-2'>
                    <label htmlFor='end_date'>End</label>
                    <input
                        type='date'
                        id='end_date'
                        onChange={handleChange}
                        value={workshopData.end_date}
                        className='w-36 lg:w-44 p-1.5 bg-blue-light/40 focus-visible:outline-1 focus-visible:outline-blue-light rounded ml-4 mb-6 md:p-3'
                    />
                </div>

                {/* Image URL */}
                {/* <div>
                  <label htmlFor='image_url'>Image URL:</label>
                  <input
                      type='url'
                      id='image_url'
                      onChange={handleChange}
                      value={workshopData.image_url}
                  />
              </div> */}

                {/* Location */}
                {/* <div>
                  <label htmlFor='location'>Location:</label>
                  <input
                      type='text'
                      id='location'
                      onChange={handleChange}
                      value={workshopData.location}
                  />
              </div> */}

                {/* Category */}
                {/* <div>
                  <label htmlFor='category'>Category:</label>
                  <input
                      type='text'
                      id='category'
                      onChange={handleChange}
                      value={workshopData.category}
                  />
              </div> */}

                {/* Coding Language */}
                {/* <div>
                  <label htmlFor='coding_language'>Coding Language:</label>
                  <input
                      type='text'
                      id='coding_language'
                      onChange={handleChange}
                      value={workshopData.coding_language}
                  />
              </div> */}

                {/* Organisation */}
                {/* <div>
                  <label htmlFor='organisation'>Organisation:</label>
                  <input
                      type='text'
                      id='organisation'
                      onChange={handleChange}
                      value={workshopData.organisation}
                  />
              </div> */}

                {/* Submit Button */}
                <button
                    className='md:row-start-4 md:col-span-2 w-fit mx-auto py-2 px-6 rounded bg-blue-light font-bold font-accent text-2xl shadow-md shadow-blue-dark mb-8 md:text-3xl md:mt-10'
                    type='submit'
                >
                    Create
                </button>
            </form>
        </main>
    );
}

export default NewWorkshopForm;
