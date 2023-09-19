import { createUIElements } from "../../utils/gameUiHandler";
import BaseLevel from "../BaseLevel";

export default class TheHauntedForestBaseLevel extends BaseLevel {
    constructor(levelNumber, totalCollectables, gems, ranking) {
        super(levelNumber, totalCollectables, gems, 'The Haunted Forest', ranking);
    }

    createWorldProps(treeFrame = true, tantArea = true) {
        if(treeFrame) {
            if(tantArea) {
                this.add.image(570 - 128, 300, 'picnic_table').setOrigin(0).setScale(0.4);
                this.add.image(580- 128 , 100, 'tant').setOrigin(0).setScale(0.30);
                // adding lantern
                this.lantern = this.add.sprite(698- 128, 148, 'lantern')
                    .setOrigin(0).setScale(0.10);
                this.anims.create({ key: 'lantern', frameRate: 10, repeat: -1,
                frames: this.anims.generateFrameNames('lantern',
                    { prefix: 'lantern_0', start: 1, end: 4, suffix: '.png' }),
                });
                this.lantern.anims.play('lantern');
                this.add.sprite(710- 128, 130, 'lantern_stand').setOrigin(0).setScale(0.10);
            }

            // Adding trees
            this.add.image(700, -330, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(640, -200, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(590, -100, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(590, 30, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(590, 130, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(610, 250, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(590, 350, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(1250, 460, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(590, 600, 'tree_dark').setOrigin(0).setScale(0.7);
            // Left side trees
            this.add.image(20, -330, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-40, -200, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-90, -100, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-90, 30, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-90, 130, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-70, 250, 'tree_dark').setOrigin(0).setScale(0.8);
            // Add owl
            this.anims.create({
            key: 'owl_awake', frameRate: 20, repeat: -1,
            frames: this.anims.generateFrameNames('owl',
                { prefix: 'owl_awake_0', start: 0, end: 19, suffix: '.png' }),
            });
            this.add.sprite(20, 400, 'owl').setOrigin(0).setScale(0.13).play('owl_awake');
            this.add.image(-90, 350, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-70, 460, 'tree_dark').setOrigin(0).setScale(0.8);
            this.add.image(-90, 600, 'tree_dark').setOrigin(0).setScale(0.7);
        }  
        // creating UI elements
        createUIElements(this);
    }
}
