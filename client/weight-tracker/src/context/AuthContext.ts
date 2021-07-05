import createDataContext from "./createDataContext";
import * as SecureStore from 'expo-secure-store';
import weightApi from "../api/weight";

interface ActionData {
  type: string,
  payload?: any
}

export interface StateData {
  token: string | undefined,
  errorMessage: string | undefined,
  isSignin?: boolean
}

type DispatchFn = (action: ActionData) => void;

const authReducer = (state: StateData, action: ActionData): StateData | undefined => {
  switch (action.type) {
    case "clear_error":
      return { ...state, errorMessage: "" }
    case "add_error":
      return { ...state, errorMessage: action.payload }
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { errorMessage: "", token: undefined };
    default:
      break;
  }
}

const tryLocalSignin = (dispatch: DispatchFn) => async () => {
  const token = await SecureStore.getItemAsync("token").then().catch((err) => dispatch({ type: "add_error", payload: err }));
  if (token) dispatch({ type: "signin", payload: token });
}

const clearError = (dispatch: DispatchFn) => () => {
  dispatch({ type: "clear_error" });
}

const signup = (dispatch: DispatchFn) => async (email: string, password: string) => {
  try {
    const response = await weightApi.post("/signup", { email, password });

    await SecureStore.setItemAsync("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
  } catch (err) {
    dispatch({ type: "add_error", payload: "Something went wrong while signing up!" });
  }
}

const signin = (dispatch: DispatchFn) => async (email: string, password: string) => {
  try {
    const response = await weightApi.post("/login", { email, password });
    console.log(response.data.token);


    await SecureStore.setItemAsync("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
  } catch (err) {
    dispatch({ type: "add_error", payload: "Something went wrong while signing in!" });
  }
}

const signout = (dispatch: DispatchFn) => async () => {
  await SecureStore.deleteItemAsync("token");
  dispatch({ type: "signout" });
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, clearError, signup, signin, signout },
  { token: undefined, errorMessage: "" }
);