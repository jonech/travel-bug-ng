import {Pipe, PipeTransform} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({name: 'avatarLetters'})
export class AvatarLetters implements PipeTransform {

    constructor() {}

    transform(value: string): string {
      if (value == null) {
        return;
      }
      // split, then take first alphabet of each item, join together
      return value.split(" ").map(v => v[0]).join("");
    }
}
