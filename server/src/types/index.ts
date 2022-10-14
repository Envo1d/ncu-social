import { Request, Response } from 'express'
import { Stream } from 'stream'

export interface GqlContext {
	req: Request
	res: Response
}

export type JwtPayload = {
	_id: string
	iat: number
	exp: number
}

export interface FileUpload {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: Stream
}
