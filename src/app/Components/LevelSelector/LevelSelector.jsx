"use client"
// import styles
import './levelSelector.css'
// import react
import {useState} from 'react';
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

    const [worldIndex, setWorldIndex] = useState(0);
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
    // Define an array of star images to render exactly 3 stars
    for (let j = 0; j < 3; j++) {
        if (j < accountLevelsData[i]?.starsData) {
            starImages.push(
                <img
                    key={`star-${j}`}
                    src='../assets/UI/stars/star.png'
                    style={{ width: '25px', position: 'absolute', marginTop: '-32px', marginLeft: `${10 + j * 22}px` }}
                    alt={`Star ${j + 1}`}
                />
            );
        } else {
            starImages.push(
                <img
                    key={`star-${j}`}
                    src='../assets/UI/stars/star_empty.png'
                    style={{ width: '25px', position: 'absolute', marginTop: '-32px', marginLeft: `${10 + j * 22}px` }}
                    alt={`Star ${j + 1}`}
                />
            );
        }
    }
    

    return (
        <div key={levelNumber} style={buttonStyle} className='levelButtonStyle'>
            <img
                onClick={() => {
                    if (isLevelAccessible) {
                        changeLevelTo(levelNumber);
                    }
                }}
                src={`../assets/UI/level_buttons/${i}.png`}
                className='levelButtonStyle'
                alt="Level Button"
            />
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