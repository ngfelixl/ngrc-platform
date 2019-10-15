import * as fromNavigation from '../actions/navigation';


export interface State {
  sidenavItemSelected: number;
}

const initialState: State = {
  sidenavItemSelected: 0
};

export function reducer(state: State = initialState, action: fromNavigation.NavigationAction): State {
  switch (action.type) {
    case fromNavigation.NAVIGATE_UP: {
      if (state.sidenavItemSelected > 0) {
        return {...state, sidenavItemSelected: state.sidenavItemSelected - 1 };
      } else {
        return state;
      }
    }

    case fromNavigation.NAVIGATE_DOWN: {
      if (state.sidenavItemSelected < 3) {
        return {...state, sidenavItemSelected: state.sidenavItemSelected + 1 };
      } else {
        return state;
      }
    }

    default: return state;
  }
}

export const getSidenavItemSelected = (state: State) => state.sidenavItemSelected;
