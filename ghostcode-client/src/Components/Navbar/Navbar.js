import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAuthModal,
  setAuthModalMode,
  toggleBadgeModal,
} from "../../redux/uiSlice";
import { setUserData, fetchUserData } from "../../redux/userSlice";
import { badges } from "../../constants";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const currentLevel = useSelector((state) => state.user.currentLevel);

  useEffect(() => {
    const userDataLocally = JSON.parse(localStorage.getItem("user"));

    if (
      userDataLocally &&
      userDataLocally != null &&
      userDataLocally.email &&
      userDataLocally.username &&
      userDataLocally._id
    ) {
      dispatch(setUserData(JSON.parse(localStorage.getItem("user"))));
      dispatch(fetchUserData());
    }
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // handling login popup
  const handleLoginRedirect = () => {
    dispatch(toggleAuthModal());
    dispatch(setAuthModalMode("login"));
  };

  // handling badge modal
  const handleBadgeModal = () => {
    dispatch(toggleBadgeModal());
  };

  return (
    <>
      <div className="mainContainer">
        <div className="mainTitleContainer">
          <a href="/" className="aTitleContainer">
            GHOSTCODE
          </a>
        </div>

        {userData && userData != null ? (
          <div>
            <p className="badgeContainer">
              <img
                onClick={handleBadgeModal}
                style={{ cursor: "pointer" }}
                width={"50px"}
                src={
                  userData
                    ? `assets/badges/${badges[parseInt((11 - 1) / 5)]}.png`
                    : null
                }
              />
            </p>
            <p
              onClick={() => {
                dispatch(setUserData(null));
                localStorage.removeItem("user");
                Cookies.remove("token");
                window.location.href = "/";
              }}
              className="logoutContainer"
            >
              logout
            </p>
            {currentLevel > 0 ? (
              <p className="worldContainer">
                {badges[currentLevel % 5]} - Level {currentLevel}
              </p>
            ) : null}
            <p className="emailContainer">{userData?.username}</p>
          </div>
        ) : (
          <p className="loginContainer" onClick={handleLoginRedirect}>
            login
          </p>
        )}
      </div>
    </>
  );
}
