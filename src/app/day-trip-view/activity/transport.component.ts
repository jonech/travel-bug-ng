import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'transport',
  template: `
    <div nz-col [nzSpan]="24" class="card-wrapper">
      <nz-card class="card">
        <ng-template #body>
          <div nz-row [nzType]="'flex'" [nzAlign]="'middle'">
            <div nz-col [nzSpan]="3"><div class="time">09:30</div></div>
            <div nz-col [nzSpan]="5">
            </div>
            <div nz-col [nzSpan]="16">
              <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
            </div>
          </div>
        </ng-template>
      </nz-card>
    </div>
  `
})

export class TransportComponent implements OnInit {

  iconUrl: string = "";
  baseDir: string = "./assets/img/material_icon";

  constructor() { }

  ngOnInit() { }

  getTransportIconUrl(transport: string)
	{
		switch (transport) {
			case "Walk":
				this.iconUrl = `${this.baseDir}/ic_directions_walk_black_24dp.png`;
				break;
			case "Tram":
				this.iconUrl = `${this.baseDir}/ic_tram_black_24dp.png`;
				break;
			case "Train":
				this.iconUrl = `${this.baseDir}/ic_train_black_24dp.png`;
				break;
			case "Bus":
				this.iconUrl = `${this.baseDir}/ic_directions_bus_black_24dp.png`;
				break;
			case "Car":
				this.iconUrl = `${this.baseDir}/ic_directions_car_black_24dp.png`;
				break;
			case "Taxi / Uber":
				this.iconUrl = `${this.baseDir}/ic_local_taxi_black_24dp.png`;
				break;
		}
	}
}
