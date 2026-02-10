import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import tasksReducer from "./features/tasks/taskSlice";
import categoryReducer from "./features/tasks/categorySlice";
import uiReducer from "./features/ui/uiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    listOfTask: tasksReducer,
    listOfCategory: categoryReducer,
    ui: uiReducer,
  },
});
export default store;
