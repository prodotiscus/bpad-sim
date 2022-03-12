const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.maxHeight = 600;
        this.maxWidth = 800;
        this.sprites = {};
        this.pressed = {};
        this.me = {
            physical: {
                speed: 5
            },
            mental: {}
        };
        this.preload(function (t) {
            app.stage.addChild(t.sprites.lct1);
            app.stage.addChild(
                t.wrapNpc(
                    t.sprites.npc1
                )
            );
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
            document.onkeydown = this.checkKey;
        });
    }

    wrapLocation(locObj) {
        locObj.height = 600;
        locObj.width = 800;

        locObj.x = app.renderer.width / 2;
        locObj.y = app.renderer.height / 2;

        locObj.anchor.x = 0.5;
        locObj.anchor.y = 0.5;

        return locObj;
    }

    wrapNpc(npcObj) {
        npcObj.height = 100;
        npcObj.width = 200;

        npcObj.x = app.renderer.width / 2;
        npcObj.y = app.renderer.height / 2;

        npcObj.anchor.x = 0.5;
        npcObj.anchor.y = 0.5;

        return npcObj;
    }

    sendKey (key) {
        if (this.sprites.npc1 === undefined) return;

        this.pressed[key] = true;

        this.pkeys = Object.keys(this.pressed);
        for (var i in this.pkeys) {
            ky = this.pkeys[i];
            if (ky == 'ArrowUp') {
                if (this.sprites.npc1.y > 0) this.sprites.npc1.y -= this.me.physical.speed;
            }
            else if (ky == 'ArrowDown') {
                if (this.sprites.npc1.y < this.maxHeight) this.sprites.npc1.y += this.me.physical.speed;
            }
            else if (ky == 'ArrowLeft') {
                if (this.sprites.npc1.x > 0) this.sprites.npc1.x -= this.me.physical.speed;
            }
            else if (ky == 'ArrowRight') {
                if (this.sprites.npc1.y < this.maxWidth) this.sprites.npc1.x += this.me.physical.speed;
            }
        }
    }

    unsendKey (key) {
        delete this.pressed[key];
    }
    
}


var game = new Game();

document.addEventListener('keydown', function (e) {

    e = e || window.event;

    game.sendKey(e.key);

});

document.addEventListener('keyup', function (e) {

    e = e || window.event;

    game.unsendKey(e.key);

});