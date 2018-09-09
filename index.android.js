import {AppRegistry} from "react-native";
import setup from "./src/setup";

global.__APP__ = true;
global.__ANDROID__ = true;
global.__IOS__ = false;

AppRegistry.registerComponent('imooc_gp', () => setup);

