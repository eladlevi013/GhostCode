"use client"
import React, { useEffect, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
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


export const LayoutContext = createContext();
export default function RootLayout({ children }) {
    // saving fetched data of the account
    const setAccountData = useAccountDataStore((state) => state.setAccountData);
    const accountData = useAccountDataStore((state) => state.accountData);
    // saving token
    const token = useTokenStore((state) => state.token);

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

    useEffect(() => {
      console.log(accountData);
    }, [accountData]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      useTokenStore.setState({ token: storedToken });
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      useThemeStore.setState({ theme: storedTheme });
    }
  }, []);

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
