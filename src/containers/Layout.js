import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import HeaderApp from "../components/HeaderApp";
import FooterApp from "../components/FooterApp";
import Routes from "../routes/index"
import {useDispatch} from "react-redux";
import {fetchLogin} from "../store/secureSlice";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('login') && localStorage.getItem('password')) {
      dispatch(fetchLogin({
        login: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }));
    }
  }, []);

  return (
    <BrowserRouter>
      <HeaderApp />
        <Routes />
      <FooterApp />
    </BrowserRouter>
  );
}
