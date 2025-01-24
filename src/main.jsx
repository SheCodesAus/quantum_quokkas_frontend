import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import { AuthProvider } from './components/AuthProvider';

import Nav from './components/Nav';
import Home from './pages/Home';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Workshops from './pages/Workshops';
import Workshop from './pages/Workshop';
import NewNote from './pages/NewNote';
import NewWorkshop from './pages/NewWorkshop';
import UsersNotes from './components/UsersNotes';
import UsersWorkshops from './components/UsersWorkshops';
import EditProfile from './components/EditProfile';
import Loader from './components/Loader';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Nav />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/loader', element: <Loader /> },
            {
                path: '/account',
                element: <Account />,
                children: [
                    { path: '/account/notes', element: <UsersNotes /> },
                    { path: '/account/workshops', element: <UsersWorkshops /> },
                    { path: '/account/editprofile', element: <EditProfile /> },
                ],
            },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            { path: '/newworkshop', element: <NewWorkshop /> },
            { path: '/newnote', element: <NewNote /> },
            { path: '/workshop/:id', element: <Workshop /> },
            { path: '/workshops', element: <Workshops /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
