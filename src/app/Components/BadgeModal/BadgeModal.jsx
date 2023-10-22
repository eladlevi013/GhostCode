"use client";
// import styles
import "./badgeModal.css";
// import stores
import useBadgeModalStore from "@/app/stores/useBadgeModalStore";
import useAccountDataStore from "@/app/stores/useAccountDataStore";

export default function LevelSelector(props) {
  const badgeModalShow = useBadgeModalStore((state) => state.badgeModalShow);
  const setBadgeModalShow = useBadgeModalStore(
    (state) => state.setBadgeModalShow
  );
  const accountData = useAccountDataStore((state) => state.accountData);
  let currentWorld = parseInt((accountData?.currentLevel - 1) / 5);

  const isGrayscale = (badgeIndex) => {
    return badgeIndex > currentWorld;
  };

  return (
    <>
      {badgeModalShow ? (
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
                  setBadgeModalShow(false);
                }}
                src="../assets/UI/x_button.png"
                alt="Close Button"
                className="closeButtonStyleBadgeModal"
              />
              <div
                style={{
                  position: "absolute",
                  marginTop: "-410px",
                  marginLeft: "238px",
                }}
              >
                <img
                  src={
                    isGrayscale(0)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/earth.png"
                  }
                  className="mainPageBadge"
                  style={{ marginTop: "30px", marginRight: "7px" }}
                  alt="Earth Badge"
                />
                <img
                  src={
                    isGrayscale(1)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/dark.png"
                  }
                  className="mainPageBadge"
                  style={{ marginTop: "10px", marginRight: "7px" }}
                  alt="Dark Badge"
                />
                <img
                  src={
                    isGrayscale(2)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/water-wave.png"
                  }
                  className="mainPageBadge"
                  style={{ marginTop: "10px" }}
                  alt="Water Wave Badge"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  marginTop: "-320px",
                  marginLeft: "280px",
                }}
              >
                <img
                  src={
                    isGrayscale(3)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/electricty.png"
                  }
                  className="mainPageBadge"
                  style={{ marginRight: "7px", marginTop: "23px" }}
                  alt="Electricity Badge"
                />
                <img
                  src={
                    isGrayscale(4)
                      ? "assets/badges/unknown.png"
                      : "assets/badges/poison.png"
                  }
                  className="mainPageBadge"
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
