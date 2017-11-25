export class Auth {
  constructor(options: Auth) {
    this.jwt = options.jwt || null;
    this.error = options.error || null;
    this.isLogin = options.isLogin || false;
  }
  public jwt?: string;
	public error?: string;
	public isLogin?: boolean;
}
