import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import butterfly from "redux-butterfly";

import game from "./reducers/game/index";
const reducer = combineReducers({
  game
});

export default createStore(reducer, composeWithDevTools());
