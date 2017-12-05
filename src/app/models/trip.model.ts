export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface TripPermission {
  permission?: string;
  user: User;
}

export class Trip {
  public constructor(init?: Partial<Trip>) {
    Object.assign(this, init);
  }

	public id?: number;
	public location?: string;
	public numberOfDays?: string;
	public startDate?: string;
	public endDate?: string;
	public tripLocationId?: string;
	public tripName?: string;

	public Days?: { };
	public Admin?: { };
  public Regular?: { [id: string] : string};
  public tripPermissions?: TripPermission[];
}
