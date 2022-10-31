export const validMessage = {
	required: (name: string) => `${name} is required field`,
	valid: (name: string) => `${name} is not valid`,
	minLenght: (name: string, count: number) =>
		`${name} must have at least ${count} characters`,
	maxLenght: (name: string, count: number) =>
		`${name} must be no more than ${count} characters`,
}
