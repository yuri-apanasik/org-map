import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonAvatarComponent } from './person-avatar.component';



@NgModule({
  declarations: [
    PersonAvatarComponent,
  ],
  exports: [
    PersonAvatarComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PersonAvatarModule { }
