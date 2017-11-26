interface GoogleLocation
{
	address: string;
	id: string;
	lat: number;
	lng: number;
	name: string;
}

export class Location
{
	public description?: string;
	public eventName?: string;
	public time?: string;
	public timeSort?: number;
	public location?: GoogleLocation;
}
