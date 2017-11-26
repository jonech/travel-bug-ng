import { NgModule } from '@angular/core';

import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { AvatarLetters } from './pipes/avatar-letters.pipe';

@NgModule({
  imports: [

  ],
  declarations: [
    StringToDatePipe,
    AvatarLetters
  ],
  providers: [],
  exports: [
    StringToDatePipe,
    AvatarLetters
  ],
})
export class SharedModule { }
