import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'location-row',
	template:
	`
		<div class="span_60 col" *ngIf="activity.location">
			{{ activity.eventName }}
		<br>
			{{ activity.location.name }}
		<br>
			{{ activity.description }}
		</div>
	`
})

export class LocationRowComponent implements OnInit
{
	constructor(

	) { }

	ngOnInit() { }
}
