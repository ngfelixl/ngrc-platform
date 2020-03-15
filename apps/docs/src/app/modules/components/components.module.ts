import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  exports: [
    FooterComponent,
    NavigationComponent
  ]
})
export class ComponentsModule {}
