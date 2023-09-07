"use client"
// import styles
import './levelSelector.css'
// import constants
import {worlds} from '@/app/constants';
// import stores
import useProgressStore from '@/app/stores/useProgressStore';
import useLevelSelectionModalStore from '@/app/stores/useLevelSelectionModalStore';
import useAccountDataStore from '@/app/stores/useAccountDataStore';

export default function LevelSelector(props) {
    const currentLevel = useProgressStore((state) => state.currentLevel);
    const setCurrentLevel = useProgressStore((state) => state.setCurrentLevel);
    const setCurrentWorld = useProgressStore((state) => state.setCurrentWorld);
    const setLevelSelectorModalStore = useLevelSelectionModalStore
        ((state) => state.setSelectorModalMode);
    const accountData = useAccountDataStore((state) => state.accountData);
    const setWorldIndex = props.setWorldIndex;
    const worldIndex = props.worldIndex;
    const currentAccountLevel = accountData.currentLevel;
    const accountLevelsData = accountData.levelsData;

    function changeLevelTo(gotoLevel) {
        // changing level while passing states
        props.phaserGame.scene.scenes[currentLevel - 1]
            .scene.start(`level${gotoLevel}`, {
            setLevelState: setCurrentLevel,
            setLevelWorld: setCurrentWorld,
            setLevelSelectorShow: setLevelSelectorModalStore
        })
        setLevelSelectorModalStore(false)
        setCurrentLevel(gotoLevel)
    }

    return (
        <div className='darkContainer'>
            <div className='widePanelContainer'>
                <img src= '../assets/UI/wide_panel.png' 
                    className='widePanelStyle' alt="Wide Panel"/>
                <h1 className="levelSelectorWorldName">
                    {worlds[worldIndex]}
                </h1>
                <img onClick={() => {setLevelSelectorModalStore(false)}}
                    src='../assets/UI/x_button.png'
                    alt="Close Button" className='closeButtonStyle'/>
                <img src='../assets/UI/arrow_forward_button.png' 
                    onClick={() => {worldIndex == 3 ? null:setWorldIndex(worldIndex + 1)}}
                    style={{left: '610px'}} className='arrowButtonStyle' alt="Close Button"/>
                <img src='../assets/UI/arrow_back_button.png'
                    onClick={() => {worldIndex == 0 ? null:setWorldIndex(worldIndex - 1)}}
                    style={{left: '-80px'}} className='arrowButtonStyle' alt="Close Button"/>

                {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
                    const levelNumber = i + worldIndex * 5;
                    const isLevelAccessible = levelNumber <= currentAccountLevel;

                    const buttonStyle = {
                        top: `${i > 3 ? -238 : -340}px`,
                        left: `${(i - 1) * 10 + 90 + (i > 3 ? -300 : -50)}px`,
                        opacity: isLevelAccessible ? 1 : 0.5,
                        pointerEvents: isLevelAccessible ? 'auto' : 'none',
                    };

                    const starImages = [];  
                    if (i + worldIndex * 5 <= currentAccountLevel) {
                        for (let j = 0; j < 3; j++) {
                            let marginTopValue = j === 1 ? '-26px' : '-32px'; // Adjusted marginTop for index 1
                    
                            if (accountLevelsData && j < accountLevelsData[i + worldIndex * 5]?.starsData) {
                                starImages.push(
                                    <img
                                        key={`star-${j}`}
                                        src='../assets/UI/stars/star.png'
                                        style={{
                                            width: '23px',
                                            position: 'absolute',
                                            marginTop: marginTopValue, // Apply marginTop here
                                            marginLeft: `${12 + j * 21}px`
                                        }}
                                        alt={`Star ${j + 1}`}
                                    />
                                );
                            } else {
                                starImages.push(
                                    <img
                                        key={`star-${j}`}
                                        src='../assets/UI/stars/star.png'
                                        style={{
                                            width: '23px',
                                            position: 'absolute',
                                            marginTop: marginTopValue, // Apply marginTop here
                                            marginLeft: `${12 + j * 21}px`,
                                            filter: 'grayscale(100%)',
                                            filter: 'brightness(0.5) grayscale(100%)'
                                        }}
                                        alt={`Star ${j + 1}`}
                                    />
                                );
                            }
                        }
                    }
                    
                    return (
                        <div key={levelNumber} style={buttonStyle} className='levelButtonStyle'>
                            <img
                                onClick={() => {
                                    if (isLevelAccessible) {
                                        changeLevelTo(levelNumber)
                                    }
                                }}
                                src={`../assets/UI/level_buttons/${i}.png`}
                                className='levelButtonStyle'
                                alt="Level Button"/>
                            <div>
                                {starImages}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
