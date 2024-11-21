import { Dispatch } from "redux";

export type Status = "loading" | "failed" | "success";
const CHANGE_APP_STATUS = "CHANGE_APP_STATUS";

export const initialState = {
  status: "loading" as Status
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActions
): InitialStateType => {
  switch (action.type) {
    case "CHANGE_APP_STATUS": {
      return {
        ...state,
        status: action.payload.status
      };
    }

    default:
      return state;
  }
};

//AC
export const changeAppStatus = (status: Status) => {
  return {
    type: CHANGE_APP_STATUS,
    payload: { status }
  } as const;
};

//TC

export type UpdateAuthors = ReturnType<typeof changeAppStatus>;
export type AppActions = UpdateAuthors;
