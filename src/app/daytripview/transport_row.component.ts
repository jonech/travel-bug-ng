import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'transport-row',
	template:
	`
		<div class="section group transport-holder">
			<div class="col" id="time">{{ _transport.time }}</div>
			<img class="transport-icon col" src="{{ _iconUrl }}">
			<div class="col" id="description">{{ _transport.description }}</div>
		</div>
	`,
	styleUrls: ['./transport_row.component.css']
})

export class TransportRowComponent implements OnInit {

	@Input('transport') _transport: any;
	@Input('activityId') _activityId: string;
	_iconUrl: string = "";
	baseDir: string = "./assets/img/material_icon";

	ngOnInit()
	{
		this.getTransportIconUrl(this._transport.transport);
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
