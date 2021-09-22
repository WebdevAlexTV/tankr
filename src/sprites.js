import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");
  k.loadSprite("sprites", "towerDefense_tilesheet.png", {
    sliceX: 23,
    sliceY: 13,
  });
};

export default loadSprites;
