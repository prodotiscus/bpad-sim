const app = new PIXI.Application();

document.body.appendChild(app.view);


class Game {
    constructor() {
        this.locationNumber = 1;
        this.loadLocation(this.locationNumber);
    }

    loadLocation(number) {
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
    }
}


