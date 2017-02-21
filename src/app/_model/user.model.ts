interface PasswordGroup
{
	password: string;
	passwordconf: string;
}

export class User
{
	public email: string;
	public firstname: string;
	public lastname: string;
	public matchingPwd: PasswordGroup;
}
