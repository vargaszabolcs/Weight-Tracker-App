import createDataContext from "./createDataContext";
import weightApi from "../api/weight";

interface ActionData {
  type: string,
  payload?: any
}

export interface WeightEntryData {
  weight: number,
  mood?: string
}

type dispatchFn = (action: ActionData) => void

const dataReducer = (state: any[], action: ActionData) => {
  switch (action.type) {
    case "fetch_weight":
      return action.payload;
    default:
      return state;
  }
};

const fetchWeight = (dispatch: dispatchFn) => async () => {
  const response = await weightApi.get("/weights");
  dispatch({ type: "fetch_weight", payload: response.data.reverse() });
}

const addWeight = (dispatch: dispatchFn) => async (weightEntry: WeightEntryData) => {
  await weightApi.post("/weights", { weightEntry });
}

export const { Provider, Context } = createDataContext(
  dataReducer,
  { fetchWeight, addWeight },
  []
);