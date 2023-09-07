import { resetScene } from './uiHandler.js'
import axios from 'axios';

export function showFinishLevelPanel(scene, stars)
{
    // send data to server
    axios.post('/api/account/level', {
        finishedLevel: scene.level,
        linesOfcode: scene.linesOfcode,
        stars: stars
    },
    {        headers: { authorization: `Bearer ${scene.token}` },
}).then((res) => {
        axios.get('/api/account/getData/', {
            headers: { Authorization: `Bearer ${scene.token}` }
        }).then(res => {
            scene.setAccountData(res.data);
        }
        ).catch(err => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });

    const posX = 0, posY = 0;
    const { width, height } = scene.sys.game.scale.gameSize;
    const color = 0x000000;
    const alpha = 0.5;
    const darkScreen = scene.add.rectangle(posX, posY, width, height, color, alpha)
    darkScreen.setOrigin(0, 0).setDepth(100);
    
    // add panel
    const widePanel = scene.add.image(340, 400, 'wide_panel')
        .setOrigin(0.4).setScale(0).setDepth(105);
    scene.tweens.add({
      targets: widePanel,
      scaleX: 0.45,
      scaleY: 0.45,
      x: 280,
      y: 400,
      duration: 340,
      ease: 'Linear',
      repeat: 0,
      yoyo: false,
    }).on('complete', () => {
        // add stars
        let i = 0;
        for(i=0; i<stars; i++)
            scene.add.image(240 + i*100, 380, 'star').setOrigin(0.3)
                .setScale(0.16).setDepth(105);
        for(i; i < 3; i++)
            scene.add.image(240 + i*100, 380, 'star_empty').setOrigin(0.3)
                .setScale(0.16).setDepth(105);
            
        // building ui buttons
        let retry_button = scene.add.image(350, 500, 'retry_button')
            .setOrigin(0.5).setScale(0.3).setDepth(105);
        retry_button.setInteractive();
        retry_button.on('pointerdown', () => {
            resetScene(scene);
        });
    
        let next_level_button = scene.add.image(465, 500, 'next_level_button')
            .setOrigin(0.5).setScale(0.3).setDepth(105);
        next_level_button.setInteractive();
        next_level_button.on('pointerdown', () => {
            scene.movingTimer?.destroy();
            scene.scene.start(`level${++scene.level}`,
            {
                setLevelState: scene.setLevelState,
                setLevelWorld: scene.setLevelWorld,
                setLevelSelectorShow: scene.setLevelSelectorShow
            }
            );
        });
    
        let menu_button = scene.add.image(235, 500, 'menu_button')
            .setOrigin(0.5).setScale(0.3).setDepth(105)
        menu_button.setInteractive();
        menu_button.on('pointerdown', () => {
            scene.setLevelSelectorShow(true);
        });
    });
}
