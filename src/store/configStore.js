import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import butterfly from "redux-butterfly";
import fetchJson from "../utils/fetch";

import game from "./reducers/game/index";
import userId from "./reducers/userId/index";
import results from "./reducers/results/index";

const reducer = combineReducers({
  game,
  userId,
  results
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(
      butterfly({
        enhancers: {
          dynamics: {
            fetchJson
          }
        },
        enums: {}
      })
    )
  )
);
export const persistor = persistStore(store);
