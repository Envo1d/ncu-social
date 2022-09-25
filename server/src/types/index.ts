import { Request, Response } from 'express'

export interface GqlContext {
	req: Request
	res: Response
}

export type JwtPayload = {
	_id: string
	iat: number
	exp: number
}
