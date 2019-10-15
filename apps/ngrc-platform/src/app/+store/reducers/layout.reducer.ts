import * as fromLayout from '../actions/layout';

export interface State {
  showSidenav: boolean;
  showMappingSelect: boolean;
  isLandscape: boolean;
}

const initialState: State = {
  showSidenav: false,
  showMappingSelect: false,
  isLandscape: window.innerHeight < window.innerWidth
};

export function reducer(state: State = initialState, action: fromLayout.LayoutAction): State {
  switch (action.type) {
    case fromLayout.LayoutActionTypes.CloseSidenav:
      return {...state, showSidenav: false };

    case fromLayout.LayoutActionTypes.OpenSidenav:
      return {...state, showSidenav: true };

    case fromLayout.LayoutActionTypes.ToggleSidenav:
      return {...state, showSidenav: !state.showSidenav };

    case fromLayout.LayoutActionTypes.OpenMappingSelect:
      return {...state, showMappingSelect: true };

    case fromLayout.LayoutActionTypes.CloseMappingSelect:
      return {...state, showMappingSelect: false };

    case fromLayout.LayoutActionTypes.CheckOrientation:
      return {...state, isLandscape: window.innerHeight > window.innerWidth };

    default: return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
