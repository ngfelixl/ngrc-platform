import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects, reducers, metaReducers } from './';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer, DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './router.utils';

@NgModule({
  imports: [
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,
      stateKey: 'router',
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  exports: [
    StoreModule,
    StoreDevtoolsModule,
    StoreRouterConnectingModule
  ]
})
export class ReduxModule {}
