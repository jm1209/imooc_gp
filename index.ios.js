import {AppRegistry} from "react-native";
import setup from "./src/setup";

global.__APP__ = true;
global.__ANDROID__ = false;
global.__IOS__ = true;

AppRegistry.registerComponent('imooc_gp', () => setup);