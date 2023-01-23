import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import News from "../containers/News";
import Signup from './Auth/Signup';
import Login from "./Auth/Login";
import SelectedNews from "../containers/SelectedNews";
import {useSelector} from "react-redux";

export const SignupRoute = '/signup';
export const LoginRoute = '/login';
// export const NoMatchRoute = '/'

export default function Index() {
  // const {isAuth} = useSelector((state) => state.secure)
  return (
    <Routes>
      <Route exact path="/" element={<News />} />
      <Route exact path="/news/:id" element={<SelectedNews />} />
      <Route exact path={SignupRoute} element={<Signup />} />
      <Route exact path={LoginRoute} element={<Login />} />
      <Route exact path="*" element={<Navigate to={LoginRoute} />} />
    </Routes>
  );
}
