import { Action, createAction } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  ToggleSidenav = '[Layout] Toggle Sidenav',

  OpenMappingSelect = '[Layout] Open Mapping Select',
  CloseMappingSelect = '[Layout] Close Mapping Select',

  CheckOrientation = '[Layout] Check Orientation'
}

export const openSidenav = createAction(
  '[Layout] Open Sidenav'
);

export const closeSidenav = createAction(
  '[Layout] Close Sidenav'
);

export const toggleSidenav = createAction(
  '[Layout] Toggle Sidenav'
);

export const openMappingSelect = createAction(
  '[Layout] Open Mapping Select'
);

export const closeMappingSelect = createAction(
  '[Layout] Close Mapping Select'
);

export const checkOrientation = createAction(
  '[Layout] Check Orientation'
);
