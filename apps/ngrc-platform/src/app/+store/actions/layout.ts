import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  ToggleSidenav = '[Layout] Toggle Sidenav',

  OpenMappingSelect = '[Layout] Open Mapping Select',
  CloseMappingSelect = '[Layout] Close Mapping Select',

  CheckOrientation = '[Layout] Check Orientation'
}

export class OpenSidenav implements Action { readonly type = LayoutActionTypes.OpenSidenav; }
export class CloseSidenav implements Action { readonly type = LayoutActionTypes.CloseSidenav; }
export class ToggleSidenav implements Action { readonly type = LayoutActionTypes.ToggleSidenav; }

export class OpenMappingSelect implements Action { readonly type = LayoutActionTypes.OpenMappingSelect; }
export class CloseMappingSelect implements Action { readonly type = LayoutActionTypes.CloseMappingSelect; }

export class CheckOrientation implements Action { readonly type = LayoutActionTypes.CheckOrientation; }

export type LayoutAction =
OpenSidenav
| CloseSidenav
| ToggleSidenav
| OpenMappingSelect
| CloseMappingSelect
| CheckOrientation;
