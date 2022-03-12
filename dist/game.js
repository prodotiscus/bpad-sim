const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.sprites = {};
        this.defaultNpc = null;
        this.preload(function (t) {
            app.stage.addChild(t.sprites.lct1);
        });
    }

    borderPolicy = {
        1: {
            forbidden: [
                [300, 400], [500, 600]
            ]
        }
    }

    preload (onload) {
        app.loader
        .add('lct1', 'src/images/location1.png')
        .add('npc_a', 'src/images/npc-a.jpg')
        .load((loader, resources) => {
            this.sprites.lct1 = this.wrapLocation(new PIXI.Sprite(resources.lct1.texture));
            this.sprites.npc1 = new PIXI.Sprite(resources.npc_a.texture);
            onload(this);
        });
    }

    wrapLocation(locObj) {
        locObj.height = 600;
        locObJ.width = 800;

        locObJ.x = app.renderer.width / 2;
        locObJ.y = app.renderer.height / 2;

        locObj.anchor.x = 0.5;
        locObj.anchor.y = 0.5;

        return locObj;
    }
}


var game = new Game();


