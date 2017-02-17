import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'transport-row',
	template:
	`
		<div class="span_80 col">
			<img class="span_10" src="{{ _iconUrl }}">
			<br>
			{{ transport.transport }}
			<br>
			{{ transport.description }}
		</div>
	`
})

export class TransportRowComponent implements OnInit {

	@Input() transport: any;
	_iconUrl: string = "";
	baseDir: string = "./assets/img/material_icon";

	ngOnInit()
	{
		this.getTransportIconUrl(this.transport.transport);
	}

	getTransportIconUrl(transport: string)
	{
		switch (transport) {
			case "Walk":
				this._iconUrl = `${this.baseDir}/ic_directions_walk_black_24dp.png`;
				break;
			case "Tram":
				this._iconUrl = `${this.baseDir}/ic_tram_black_24dp.png`;
				break;
			case "Train":
				this._iconUrl = `${this.baseDir}/ic_train_black_24dp.png`;
				break;
			case "Bus":
				this._iconUrl = `${this.baseDir}/ic_directions_bus_black_24dp.png`;
				break;
			case "Car":
				this._iconUrl = `${this.baseDir}/ic_directions_car_black_24dp.png`;
				break;
			case "Taxi / Uber":
				this._iconUrl = `${this.baseDir}/ic_local_taxi_black_24dp.png`;
				break;
		}
	}
}
