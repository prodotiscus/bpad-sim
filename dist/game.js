const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.maxHeight = 600;
        this.maxWidth = 800;
        this.sprites = {};
        this.pressed = {};
        this.lctNumber = 1;
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
                [{x: 295, y: 260}, {x: 425, y:130}]
            ]
        }
    }

    checkPolicy(x, y) {
        var fbd = this.borderPolicy[this.lctNumber].forbidden;
        for (var i = 0; i < fbd.length; i ++) {
            var xx = [fbd[i][0].x, fbd[i][1].x];
            var yy = [fbd[i][0].y, fbd[i][1].y];
            var comp = function(a, b) {
                return a - b;
            }
            xx.sort(comp);
            yy.sort(comp);

            console.log(xx, x, yy, y);

            if (xx[0] < x && x < xx[1] && yy[0] < y && y < yy[1]) return false;
        }

        return true;
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

        this.pKeys = Object.keys(this.pressed);
        
        var x = this.sprites.npc1.x;
        var y = this.sprites.npc1.y;

        for (var i = 0; i < this.pKeys.length; i ++) {
            if (this.pKeys[i] == 'ArrowUp') {
                if (y > 0) y -= this.me.physical.speed;
            }
            else if (this.pKeys[i] == 'ArrowDown') {
                if (y < this.maxHeight) y += this.me.physical.speed;
            }
            else if (this.pKeys[i] == 'ArrowLeft') {
                if (x > 0) x -= this.me.physical.speed;
            }
            else if (this.pKeys[i] == 'ArrowRight') {
                if (y < this.maxWidth) x += this.me.physical.speed;
            }
        }

        this.sprites.npc1.x = x;
        this.sprites.npc1.y = y;
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