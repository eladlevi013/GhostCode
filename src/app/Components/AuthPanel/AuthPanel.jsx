"use client"
// impor other libraries
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
// import react
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
// importing stores
import useTokenStore from '../../stores/useTokenStore';
import useAuthModalStore from '../../stores/useAuthModalStore';
// import styling
import './authPanel.css';
import '../../mainPage.css'

const AuthPanel = () => {
  // input states
  const [email, setemail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // global states
  const setToken = useTokenStore((state) => state.setToken);
  const authPanelShow = useAuthModalStore((state) => state.authPanelShow);
  const authPanelMode = useAuthModalStore((state) => state.authPanelMode);
  const setAuthPanelShow = useAuthModalStore((state) => state.setAuthPanelShow);
  const setAuthPanelMode = useAuthModalStore((state) => state.setAuthPanelMode);

  // handle input state changes
  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // disable scrolling when modal is open
  useEffect(() => {
    if(authPanelShow == true)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'unset';
  }, [authPanelShow]);

  // handling login
  const handleLogin = () => {
    setLoading(true);
    axios.post('/api/auth/login/', {
      email: email,
      password: password
    }).then(res => {
      toast.success('Successfully logged in!')
      setAuthPanelShow(false);
      setLoading(false);
      if(res.data.token){
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      }
    }).catch(err => {
      toast.error(err.response.data.message);
      setLoading(false);
    })
  }

  // handle register
  const handleRegister = () => {
    setLoading(true);
    axios.post('/api/auth/register', {
      email: email,
      username: username,
      password: password
    }).then(res => {
      setAuthPanelShow(false);
      setLoading(false);
      if(res.data.token){
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        toast.success('Account created successfully!');
      }
      }).catch(err => {
        toast.error(err.response.data.message);
        setLoading(false);
    })
  }

  return (
    <>
      <Toaster />
      { authPanelShow == true ? (
        <div>
          <div className='darkModalBackground'>
            <div className='widePanelDiv'>
              <img src= '../assets/UI/wide_panel_clean.png' style={{width:"100%"}}/>
              <img onClick={() => {setAuthPanelShow(false)}}
                src='../assets/UI/x_button.png' alt="Close Button"
                className='widePanelCloseButton'/>
            </div>
          </div>

          {authPanelMode == 'login' ? (
            <>
              <div className='modeContainer'>
                <div className='titleContainer'>LOGIN:</div>
              </div>
      
              <div className='inputsContainer'>
                <div className='inputSingleContainer'>
                  <input type="text" name="email" placeholder="Email"
                      required="" className='inputStyle'
                      onChange={handleEmailChange}/>
                  <input type="password" name="password"
                    placeholder="Password" required="" className='inputStyle'
                    onChange={handlePasswordChange}/>
      
                  <div className="bottomContainer">
                    <div className="buttonsContainer">
                      {loading ? (
                        <div className='loadingContainer' style={{marginTop: "-20px"}}>
                          <ReactLoading type={'bubbles'} height={6} width={100} color='#39261f' />
                        </div>
                      ) : (
                        <>
                          <button className="buttonStyle" style={{marginRight: "10px",
                            backgroundImage: "url('/assets/UI/register_button.png')"}}
                            onClick={() => {
                              setAuthPanelMode('register');}}/>
                          <button className="buttonStyle" style={{marginLeft: "10px",
                            backgroundImage: "url('/assets/UI/submit_button.png')"}}
                            onClick={() => { handleLogin() }}/>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ):(
            <>
              <div className='modeContainer'>
                <div className='titleContainer' style={{marginLeft: '-90px', 
                  marginTop: '-125px'}}>REGISTER:</div>
              </div>

              <div className='inputsContainer'>
                <div className='inputSingleContainer' style={{marginTop:"10px"}}>
                  <input type="text" name="username" placeholder="Username"
                    required="" className='inputStyle'
                    onChange={handleUsernameChange}/>
                  <input type="text" name="email" placeholder="Email"
                    required="" className='inputStyle'
                    onChange={handleEmailChange}/>
                  <input type="password" name="password" placeholder="Password"
                    required="" className='inputStyle'
                    onChange={handlePasswordChange}/>

                  <div className="bottomContainer">
                    <div className="buttonsContainer">
                      {loading ? (
                        <div className='loadingContainer'>
                          <ReactLoading type={'bubbles'} height={6} width={100} color='#39261f' />
                        </div>
                      ) : (
                        <>
                          <button className="buttonStyle" style={{marginRight: "10px",
                            backgroundImage: "url('/assets/UI/login_button.png')"}}
                            onClick={() => {
                              setAuthPanelMode('login');}}/>
                          <button className="buttonStyle" style={{marginLeft: "10px",
                            backgroundImage: "url('/assets/UI/submit_button.png')"}}
                            onClick={() => { handleRegister() }}/>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ):null}
    </>
  )
}

export default AuthPanel;
