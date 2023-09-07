"use client"
// import react
import React, {useEffect} from 'react';
// loading components
import AuthPanel from './Components/AuthPanel/AuthPanel';
import Navbar from './Components/Navbar/Navbar';
import BadgeModal from './Components/BadgeModal/BadgeModal';
// loading stores
import useTokenStore from './stores/useTokenStore';
import useThemeStore from './stores/useThemeStore';
import useAccountDataStore from './stores/useAccountDataStore';
// loading axios
import axios from 'axios';

export default function RootLayout({ children }) {
    const token = useTokenStore((state) => state.token);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedTheme = localStorage.getItem('theme');
      if (storedToken)
        useTokenStore.setState({ token: storedToken });
      if (storedTheme)
        useThemeStore.setState({ theme: storedTheme });
    }, []);

    // fetching account data from server
    useEffect(() => {
      if (token && token != "null") {
        axios.get('/api/account/getData/', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
          useAccountDataStore.setState({accountData: res.data});
        }).catch(err => {
          console.log(err);
        });
      }
    }, [token]);

  return (
    <html>
      <head>
        <title>GhostCode</title>
        <link rel="icon" href="/assets/web/favicon.ico" />
      </head>
      <body style={{ fontFamily: 'inter' }}>
        <Navbar/>
        <BadgeModal/>
        {children}
        <AuthPanel />
      </body>
    </html>
  );
}
