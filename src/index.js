import k from "./kaboom";
import main from "./scenes/main";
import loadSprites from "./sprites";

loadSprites();

k.scene("main", main);

k.go("main");
