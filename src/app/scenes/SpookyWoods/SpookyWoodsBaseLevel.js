import { createUIElements } from "../../utils/gameUiHandler";
import BaseLevel from "../BaseLevel";

export default class SpookyWoodsBaseLevel extends BaseLevel {
    constructor(levelNumber, totalCollectables, gems, ranking) {
        super(levelNumber, totalCollectables, gems, 'Spooky Woods', ranking);
    }

    createWorldProps(treeFrame = true, tantArea = true) {        
        if (treeFrame) {
            this.add.image(550 - 128, -330, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(600 - 128, -270, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(700 - 128, -150, 'tree').setOrigin(0).setScale(0.8);

            if (tantArea) {
                // adding other props
                this.add.image(570 - 128, 300, 'picnic_table').setOrigin(0).setScale(0.4);
                this.add.image(580 - 128, 100, 'tant').setOrigin(0).setScale(0.30);
                // adding lantern
                this.lantern = this.add.sprite(698 - 128, 148, 'lantern')
                    .setOrigin(0).setScale(0.10);
                this.anims.create({
                    key: 'lantern', frameRate: 10, repeat: -1,
                    frames: this.anims.generateFrameNames('lantern', { 
                        prefix: 'lantern_0',start: 1, end: 4, suffix: '.png' })
                });
                this.lantern.anims.play('lantern');
                this.add.sprite(710 - 128, 130, 'lantern_stand')
                    .setOrigin(0).setScale(0.10);
            }

            // Right side trees
            this.add.image(730 - 128, 0, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(700 - 128, 120, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(690 - 128, 250, 'tree').setOrigin(0).setScale(0.9);
            this.add.image(710 - 128, 360, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(690 - 128, 500, 'tree').setOrigin(0).setScale(0.7);
            this.add.image(730 - 128, 600, 'tree').setOrigin(0).setScale(0.7);
            // Left side trees
            this.add.image(60, -330, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(0, -200, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-50, -100, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-50, 30, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-50, 130, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-30, 250, 'tree').setOrigin(0).setScale(0.8);
            // Adding owl
            this.anims.create({
                key: 'owl_awake', frameRate: 20, repeat: -1,
                frames: this.anims.generateFrameNames('owl', { prefix: 'owl_awake_0',
                     start: 0, end: 19, suffix: '.png' })
            });
            this.add.sprite(60, 400, 'owl').setOrigin(0).setScale(0.13).play('owl_awake');
            // Adding more left side trees
            this.add.image(-50, 350, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-30, 460, 'tree').setOrigin(0).setScale(0.8);
            this.add.image(-50, 600, 'tree').setOrigin(0).setScale(0.7);
        }
        // Creating UI elements
        createUIElements(this);
    }
}
