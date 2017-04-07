export class Trip
{
	public id?: string;
	public location?: string;
	public numberOfDays?: string;
	public startDate?: string;
	public endDate?: string;
	public tripLocationId?: string;
	public tripName?: string;

	public Days?: { };
	public Admin?: { };
	public Regular?: { [id: string] : string};
}
