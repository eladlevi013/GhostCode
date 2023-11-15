import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalMode, toggleAuthModal } from "../../redux/uiSlice";
import { setUserData } from "../../redux/userSlice";
import ReactLoading from "react-loading";
import { fetchUserData } from "../../redux/userSlice";
import "./authPanel.css";
import "../../mainPage.css";
import Cookies from "js-cookie";

const AuthPanel = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const authModalOpen = useSelector((state) => state.ui.authModalOpen);
  const authPanelMode = useSelector((state) => state.ui.authModalMode);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleAccount = (token, user) => {
    Cookies.set("token", token, { expires: 30 });
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUserData(user));
  };

  const handleLogin = () => {
    setLoading(true);
    const loginData = { email, password };
    const authUrl = `${process.env.REACT_APP_SERVER_API}/auth/login`;

    axios
      .post(authUrl, loginData)
      .then((res) => {
        dispatch(fetchUserData());
        toast.success("Successfully logged in!");
        dispatch(toggleAuthModal());
        setLoading(false);
        const { token, user } = res.data;
        if (token) {
          handleAccount(token, user);
        }
      })
      .catch((err) => {
        const error = err.response.data.error;
        toast.error(error);
        setLoading(false);
      });
  };

  const handleRegister = () => {
    setLoading(true);
    const registerData = { email, username, password };
    const registerUrl = `${process.env.REACT_APP_SERVER_API}/auth/register`;

    axios
      .post(registerUrl, registerData)
      .then((res) => {
        dispatch(toggleAuthModal());
        setLoading(false);
        const { token, user } = res.data;
        if (token) {
          handleAccount(token, user);
          toast.success("Account created successfully!");
          dispatch(fetchUserData());
        }
      })
      .catch((err) => {
        const error = err.response.data.error;
        toast.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.body.style.overflow = authModalOpen ? "hidden" : "unset";
  }, [authModalOpen]);

  return (
    <>
      <Toaster />
      {authModalOpen == true ? (
        <div>
          <div className="darkModalBackground">
            <div className="widePanelDiv">
              <img
                src="../assets/UI/wide_panel_clean.png"
                style={{ width: "100%" }}
              />
              <img
                onClick={() => {
                  dispatch(toggleAuthModal());
                }}
                src="../assets/UI/x_button.png"
                alt="Close Button"
                className="widePanelCloseButton"
              />
            </div>
          </div>

          {authPanelMode == "login" ? (
            <>
              <div className="modeContainer">
                <div className="titleContainer">LOGIN:</div>
              </div>

              <div className="inputsContainer">
                <form className="inputSingleContainer">
                  <input
                    id="loginEmail"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required=""
                    className="inputStyle"
                    onChange={handleEmailChange}
                    autoComplete="email"
                  />

                  <input
                    id="loginPassword"
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required=""
                    className="inputStyle"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                  />

                  <div className="bottomContainer">
                    <div className="buttonsContainer">
                      {loading ? (
                        <div
                          className="loadingContainer"
                          style={{ marginTop: "-20px" }}
                        >
                          <ReactLoading
                            type={"bubbles"}
                            height={6}
                            width={100}
                            color="#39261f"
                          />
                        </div>
                      ) : (
                        <>
                          <button
                            className="buttonStyle"
                            style={{
                              marginRight: "10px",
                              backgroundImage:
                                "url('/assets/UI/register_button.png')",
                            }}
                            onClick={() => {
                              dispatch(setAuthModalMode("register"));
                            }}
                          />
                          <button
                            className="buttonStyle"
                            style={{
                              marginLeft: "10px",
                              backgroundImage:
                                "url('/assets/UI/submit_button.png')",
                            }}
                            onClick={() => {
                              handleLogin();
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="modeContainer">
                <div
                  className="titleContainer"
                  style={{ marginLeft: "-90px", marginTop: "-120px" }}
                >
                  REGISTER:
                </div>
              </div>

              <div className="inputsContainer">
                <form className="inputSingleContainer">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    required=""
                    className="inputStyle"
                    onChange={handleUsernameChange}
                    autoComplete="username"
                  />

                  <input
                    id="registerEmail"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required=""
                    className="inputStyle"
                    onChange={handleEmailChange}
                    autoComplete="email"
                  />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Choose a password"
                    required=""
                    className="inputStyle"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                  />

                  <div className="bottomContainer">
                    <div className="buttonsContainer">
                      {loading ? (
                        <div className="loadingContainer">
                          <ReactLoading
                            type={"bubbles"}
                            height={6}
                            width={100}
                            color="#39261f"
                          />
                        </div>
                      ) : (
                        <>
                          <button
                            className="buttonStyle"
                            style={{
                              marginRight: "10px",
                              backgroundImage:
                                "url('/assets/UI/login_button.png')",
                            }}
                            onClick={() => {
                              dispatch(setAuthModalMode("login"));
                            }}
                          />
                          <button
                            className="buttonStyle"
                            style={{
                              marginLeft: "10px",
                              backgroundImage:
                                "url('/assets/UI/submit_button.png')",
                            }}
                            onClick={() => {
                              handleRegister();
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AuthPanel;
