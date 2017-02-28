import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'location-row',
	template:
	`
		<a [routerLink]="[{ outlets: { 'pop-up':[_activityId] } }]">
			<div class="span_10 col">{{ _location.time }}</div>

			<div class="span_20 col">
				<img class="circle" src="https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/10175/SITours/french-riviera-day-trip-from-nice-in-nice-289164.jpg"/>
			</div>

			<div class="span_60 col">
				{{ _location.eventName }}
				<br>
				{{ _location.location.name }}
				<br>
				{{ _location.description }}
			</div>
		</a>
	`
})

export class LocationRowComponent
{
	@Input('location') _location: any;
	@Input('activityId') _activityId: string;
}
