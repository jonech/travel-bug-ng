export interface User {
  id: number;
  email: string;
}

export interface TripPermission {
  permission?: string;
  user: User;
}

export class Trip {
  constructor(param: Trip = {}) {
    this.id = param.id;
    this.startDate = param.startDate;
    this.endDate = param.endDate;
    this.tripName = param.tripName;
    this.tripPermissions = param.tripPermissions;
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
