export class User {
  public id: number
	public email?: string;
	public firstName?: string;
	public lastName?: string;
	public password?: string;
  public passwordConfirmation?: string;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
