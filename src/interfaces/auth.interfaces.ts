export interface ILoginDto {
	email: string;
	password: string;
}

export interface ISignUpDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dob: string;
	address: string;
	country: string;
}

export interface IForgotPasswordDto {
	email: string;
}

export interface IConfirmPasswordDto {
	email: string;
	confirmationCode: string;
	newPassword: string;
}

export interface ITokenGroup {
	AccessToken?: string;
	IdToken?: string;
	RefreshToken?: string;
}
