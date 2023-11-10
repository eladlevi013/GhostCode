import "./badgeModal.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleBadgeModal } from "../../redux/uiSlice";

export default function LevelSelector(props) {
  const dispatch = useDispatch();

  const badgeModalOpen = useSelector((state) => state.ui.badgeModalOpen);

  const accountData = "";
  let currentWorld = parseInt(accountData?.currentLevel / 5) + 1;

  const isDisabled = (badgeIndex) => {
    return badgeIndex >= currentWorld;
  };

  return (
    <>
      {badgeModalOpen ? (
        <>
          <div className="darkContainerBadgeModal">
            <div className="widePanelContainerBadgeModal">
              <img
                src="../assets/UI/wide_panel.png"
                className="widePanelStyleBadgeModal"
                alt="Wide Panel"
              />
              <h1 className="levelSelectorWorldNameBadgeModal">BADGES:</h1>
              <img
                onClick={() => {
                  dispatch(toggleBadgeModal());
                }}
                src="../assets/UI/x_button.png"
                alt="Close Button"
                className="closeButtonStyleBadgeModal"
              />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-390px",
                  marginLeft: "238px",
                }}
              >
                <img
                  src={
                    isDisabled(0)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/earth.png"
                  }
                  className="badge"
                  style={{ marginTop: "30px", marginRight: "7px" }}
                  alt="Earth Badge"
                />
                <img
                  src={
                    isDisabled(1)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/dark.png"
                  }
                  className="badge"
                  style={{ marginTop: "10px", marginRight: "7px" }}
                  alt="Dark Badge"
                />
                <img
                  src={
                    isDisabled(2)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/water-wave.png"
                  }
                  className="badge"
                  style={{ marginTop: "10px" }}
                  alt="Water Wave Badge"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  marginTop: "-310px",
                  marginLeft: "280px",
                }}
              >
                <img
                  src={
                    isDisabled(3)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/electricty.png"
                  }
                  className="badge"
                  style={{ marginRight: "7px", marginTop: "23px" }}
                  alt="Electricity Badge"
                />
                <img
                  src={
                    isDisabled(4)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/poison.png"
                  }
                  className="badge"
                  alt="Poison Badge"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
