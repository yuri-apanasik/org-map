import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './persons-list.component';
import { PersonAvatarModule } from '../person-avatar/person-avatar.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PersonsListComponent,
  ],
  exports: [
    PersonsListComponent,
  ],
  imports: [
    CommonModule,
    PersonAvatarModule,
    ReactiveFormsModule,
  ],
})
export class PersonsListModule { }
