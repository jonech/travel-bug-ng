import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, TemplateRef, QueryList, ViewChildren } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import * as string from 'app/shared/util/string.util';

@Component({
  selector: 'test',
  template:  `
  <ul><li #item *ngFor="let number of list">{{number}}</li></ul>

  <ng-template #template>
    <li>template</li>
  </ng-template>
`
})
export class TestComponent implements OnInit {

	constructor(
	) {
  }

  @ViewChild('template')
  template: TemplateRef<any>

  @ViewChildren('item', { read: ViewContainerRef })
  items: QueryList<ViewContainerRef>

  list: number[] = [0, 1, 2, 3, 4]

  ngAfterViewInit() {
    this.template.createEmbeddedView('<ng-template><li>template</li></ng-template>')
    setTimeout(() => {
      this.items.forEach(i => i.createEmbeddedView(this.template))
    }, 1000)
  }



	ngOnInit() {
	}

  ngOnDestroy() {
  }
}
