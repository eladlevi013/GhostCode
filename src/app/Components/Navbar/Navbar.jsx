"use client"
// reading jwt token data
import jwt_decode from 'jwt-decode';
// styles
import './navbar.css';
// importing stores
import useTokenStore from '../../stores/useTokenStore';
import useAuthModalStore from '../../stores/useAuthModalStore';
import useProgressStore from '../../stores/useProgressStore';
import useBadgeModalStore from '@/app/stores/useBadgeModalStore';
import useAccountDataStore from '@/app/stores/useAccountDataStore';
// import constants
import {badges} from '@/app/constants';
import { useEffect } from 'react';
// import axios
import axios from 'axios';

export default function Navbar() {
    const token = useTokenStore((state) => state.token);
    const clearToken = useTokenStore((state) => state.clearToken);
    const setAuthPanelShow = useAuthModalStore((state) => state.setAuthPanelShow);
    const setAuthPanelMode = useAuthModalStore((state) => state.setAuthPanelMode);
    const currentLevel = useProgressStore((state) => state.currentLevel);
    const currentWorld = useProgressStore((state) => state.currentWorld);
    const setBadgeModalShow = useBadgeModalStore((state) => state.setBadgeModalShow);
    const accountData = useAccountDataStore((state) => state.accountData);

    // handling login popup
    const handleLoginRedirect = () => {
      setAuthPanelShow(true);
      setAuthPanelMode('login');
    }

    // handling badge modal
    const handleBadgeModal = () => {
      setBadgeModalShow(true);
    }

    return (
      <>
        <div className='mainContainer'>
          <div className='mainTitleContainer'>
            <a href="/" className='aTitleContainer'>GHOSTCODE</a>
          </div>

          {token && token != "null" ? (
            <div>
              <p className='badgeContainer'>
                <img onClick={handleBadgeModal} style={{cursor: "pointer"}} width={"50px"}
                  src={accountData ? `assets/badges/${badges[parseInt((accountData?.currentLevel - 1) / 5)] }.png` : null}/>
              </p>
              <p onClick={() => { clearToken(); window.location.href = '/'; }}
                className='logoutContainer'>logout</p>
              { currentLevel > 0 ? (
                <p className='worldContainer'>
                  {currentWorld} - Level {currentLevel}
                </p>) : null
              }
              <p className='emailContainer'>
                {accountData?.username}
              </p>
            </div>
          ) : (
            <p className='loginContainer'
              onClick={handleLoginRedirect}>
              login
            </p>
          )}
        </div>
      </>
    )
}
