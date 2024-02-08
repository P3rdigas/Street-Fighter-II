import { Stage } from "./entities/Stage.js";
import { Ken } from "./entities/fighters/Ken.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";

window.addEventListener("load", function () {
  const canvasElem = document.querySelector("canvas");
  const context = canvasElem.getContext("2d");

  context.imageSmoothingEnabled = false;

  const entities = [
    new Stage(),
    new Ryu({ x: 104, y: STAGE_FLOOR }, FighterDirection.RIGHT),
    new Ken({ x: 280, y: STAGE_FLOOR }, FighterDirection.LEFT),
    new FpsCounter(),
  ];

  let frameTime = {
    previous: 0,
    secondsPassed: 0,
  };

  function frame(time) {
    window.requestAnimationFrame(frame);

    frameTime = {
      secondsPassed: (time - frameTime.previous) / 1000,
      previous: time,
    };

    console.log(entities);

    entities.forEach((entity) => {
      entity.update(frameTime, context);
    });

    entities.forEach((entity) => {
      entity.draw(context);
    });
  }

  window.requestAnimationFrame(frame);
});
