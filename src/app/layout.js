"use client";
import React, { useEffect } from "react";
import AuthPanel from "./Components/AuthPanel/AuthPanel";
import Navbar from "./Components/Navbar/Navbar";
import BadgeModal from "./Components/BadgeModal/BadgeModal";
import useTokenStore from "./stores/useTokenStore";
import useThemeStore from "./stores/useThemeStore";
import useAccountDataStore from "./stores/useAccountDataStore";
import axios from "axios";

export default function RootLayout({ children }) {
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    // loading data from local storage
    const storedToken = localStorage.getItem("token");
    const storedTheme = localStorage.getItem("theme");
    const storedAccountData = localStorage.getItem("accountData");

    // setting data to stores
    if (storedToken) useTokenStore.setState({ token: storedToken });
    if (storedTheme) useThemeStore.setState({ theme: storedTheme });
    if (storedAccountData) {
      useAccountDataStore.setState({ accountData: storedAccountData });
      console.log(storedAccountData);
    }
  }, []);

  // fetching account data from server
  useEffect(() => {
    if (token && token != "null") {
      axios
        .get("/api/account/getData/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          localStorage.setItem("accountData", JSON.stringify(res.data));
          useAccountDataStore.setState({ accountData: res.data });
        })
        .catch((err) => {
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
      <body style={{ fontFamily: "inter" }} suppressHydrationWarning={true}>
        <Navbar />
        <BadgeModal />
        {children}
        <AuthPanel />
      </body>
    </html>
  );
}
