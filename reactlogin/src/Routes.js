import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { RequireAuth, RequireAdmin } from './helpers/RequireAuth';
import Api from './helpers/Api';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import UserArea from './pages/UserArea';
import AdminArea from './pages/AdminArea';
import NotAdmin from './pages/NotAdmin';

export default () => {

    const location = useLocation()

    const api = Api();

    useEffect(() => {
        const istoken = async () => {
            await api.verifyToken();
        }
        const isAdmin = async () => {
            await api.verifyAdmin();
        }
        istoken();
        isAdmin();
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userarea" element={
                <RequireAuth>
                    <UserArea />
                </RequireAuth>
            } />
            <Route path="/adminarea" element={
                <RequireAdmin>
                    <AdminArea />
                </RequireAdmin>
            } />
            <Route path="/notadmin" element={<NotAdmin />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

    );
}