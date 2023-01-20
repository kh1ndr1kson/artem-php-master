import React from 'react';
import { Routes, Route } from 'react-router-dom';
import News from "../containers/News";
import Signup from './Auth/Signup';
import Login from "./Auth/Login";

export const SignupRoute = '/signup';
export const LoginRoute = '/login';
// export const NoMatchRoute = '/'

export default function Index() {
  return (
    <Routes>
      <Route exact path="/" element={<News />} />
      <Route exact path={SignupRoute} element={<Signup />} />
      <Route exact path={LoginRoute} element={<Login />} />
    </Routes>
  );
}
