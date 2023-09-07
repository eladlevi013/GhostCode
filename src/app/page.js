"use client"
// import framer
import { motion } from "framer-motion";
// import styles
import './mainPage.css';
// import stores
import useTokenStore from './stores/useTokenStore';
import useAuthModalStore from './stores/useAuthModalStore';

const MainPage = () => {
  const token = useTokenStore((state) => state.token);
  const setAuthPanelShow = useAuthModalStore((state) => state.setAuthPanelShow);
  const setAuthPanelMode = useAuthModalStore((state) => state.setAuthPanelMode);

  return (
    <div className='mainPageContainer' suppressHydrationWarning={true}>
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <img src="assets/web/main_img.png" className='mainPageImage'/>
        <img src="assets/spider/spider_web/web_1.png" className='mainPageSpiderWeb'/>
        <img src="assets/web/spider.gif" className='mainPageSpider'/>
      </motion.div>

      {
        token && token != "null" ?
        (
          <div className='mainPageToGameDiv'>
            <motion.div className="box" whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <img src='assets/web/to_game_button.png' className='mainPageToGameButton'
                onClick={() => { window.location.href = "/game"}} alt='to game button'/>
            </motion.div>
          </div>
        ) : null
      }

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }} className='mainPageTitle'
        style={{ marginTop: '50px' }}>
        ABOUT THE GAME:
      </motion.div>

      <div className='mainPageDescContainer'>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }} style={{ marginTop: '30px' }}>
          <p className='mainPageDesc'>
            Welcome to GhostCode, where programming meets the supernatural in a 
            chilling coding adventure! Navigate eerie algorithms and spectral logic
            as you guide a mischievous ghost through haunting puzzles to collect shimmering
            gems. Conjure efficient lines of code to unravel enigmatic enigmas, securing
            precious gems with the fewest moves. Embrace the thrill of this frightfully delightful
            coding experience and master the spectral syntax to unleash your inner cryptic coder!
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }} style={{ marginTop: '30px' }}>
        <div className='mainPageTitle' style={{marginTop: "80px", }}>
          COLLECT THE BADGES:
        </div>
      </motion.div>

      <div className='mainPageDescContainer'> 
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }} style={{ marginTop: '30px' }}>
          <p style={{marginLeft: "30px", marginRight: "30px"}}>
            As you conquer each eerie world within GhostCode, you'll earn unique badges – symbols 
            of your coding mastery. These badges celebrate your efficient solutions and mark your 
            progression through the game's spectral realms. Can you collect them all?
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }} style={{ marginTop: '30px' }}>
        <div>
          <img src="assets/badges/earth.png" className='mainPageBadge' 
            style={{marginTop: "10px", marginRight: "7px"}}/>
          <img src="assets/badges/dark.png" className='mainPageBadge' 
            style={{marginTop: "10px", marginRight: "7px"}}/>
          <img src="assets/badges/water-wave.png" className='mainPageBadge' 
            style={{marginTop: "10px"}}/>
        </div>
        <div>
          <img src="assets/badges/electricty.png" className='mainPageBadge'
            style={{marginRight: "7px"}}/>
          <img src="assets/badges/poison.png" className='mainPageBadge'/>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }} style={{ marginTop: '30px' }}>
        <div className='mainPageTitle' style={{marginTop: "80px"}}>
          JOIN US:
        </div>
        <div className='mainPageDescContainer' style={{maxWidth: "500px"}}>
          <p className='mainPageDesc'>
            Join the spectral journey and start coding your 
            ghostly adventure today!
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }} style={{ marginTop: '30px' }}>
        <div className='mainPageButtonsContainer'>
          <button
            className='mainPageButton' style={{ marginRight: "5px",
              backgroundImage: "url('/assets/UI/register_button.png')"}}
            onClick={() => {setAuthPanelMode('register');
              setAuthPanelShow(true);}}/>
          <button className='mainPageButton'
            style={{ marginLeft: "5px",
              backgroundImage: "url('/assets/UI/login_button.png')"}}
            onClick={() => {setAuthPanelMode('login');
              setAuthPanelShow(true);}}/>
        </div>
      </motion.div>
    </div>
  )
}

export default MainPage;
