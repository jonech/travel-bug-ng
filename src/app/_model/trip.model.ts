export class Trip
{
	public id: string;
	public location: string;
	public numberOfDays: string;
	public startDate: string;
	public endDate: string;
	public tripLocationId: string;
	public tripName: string;

	public Days?: { [id: string] : string };
	public Admin?: { [id: string] : string};
	public Regular?: { [id: string] : string};
}
