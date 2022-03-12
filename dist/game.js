const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.locationNumber = 1;
        this.loadLocation(this.locationNumber);
        this.npc = null;
        this.currentNpcName = "npc-a.jpg";
    }

    borderPolicy = {
        1: {
            forbidden: [
                [300, 400], [500, 600]
            ]
        }
    }

    loadLocation(number) {
        console.log(this.borderPolicy[number]);
        app.loader
        .add('lct', 'src/images/location' + number + '.png')
        .load((loader, resources) => {
            const lct = new PIXI.Sprite(resources.lct.texture);
            lct.height = 600;
            lct.width = 800;

            lct.x = app.renderer.width / 2;
            lct.y = app.renderer.height / 2;

            lct.anchor.x = 0.5;
            lct.anchor.y = 0.5;

            app.stage.addChild(lct);
        });
        
        this.spawnNpc(this.currentNpcName);
    }

    spawnNpc(name) {
        this.npc = PIXI.Sprite.from('src/images/' + name);
        this.npc.x = app.renderer.width / 2;
        this.npc.y = app.renderer.height / 2;
        this.npc.anchor.x = 0.5;
        this.npc.anchor.y = 0.5;
        app.stage.addChild(this.npc);
    }
}


var game = new Game();


