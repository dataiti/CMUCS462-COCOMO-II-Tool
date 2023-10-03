import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import caculateReducer from "./features/caculateSlice";
import authReducer from "./features/authSlice";
import constructionReducer from "./features/constructionSlice";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userConfig = {
  ...commonConfig,
  key: "root",
};

const rootReducer = combineReducers({
  calculate: caculateReducer,
  construction: constructionReducer,
  auth: persistReducer(userConfig, authReducer),
});

export default rootReducer;
