const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.maxHeight = 600;
        this.maxWidth = 800;
        this.sprites = {};
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

    
}


var game = new Game();

document.onkeydown = function (e) {

    e = e || window.event;

    if (e.key == 'ArrowUp') {
        if (game.sprites.npc1.y < game.maxHeight) game.sprites.npc1.y ++;
    }
    else if (e.key == 'ArrowDown') {
        if (game.sprites.npc1.y > 0) game.sprites.npc1.y --;
    }
    else if (e.keyCode == 'ArrowLeft') {
        if (game.sprites.npc1.x > 0) game.sprites.npc1.x --;
    }
    else if (e.keyCode == 'ArrowRight') {
        if (game.sprites.npc1.y < game.maxWidth) game.sprites.npc1.y ++;
    }

}