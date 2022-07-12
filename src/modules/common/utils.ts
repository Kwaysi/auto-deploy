import { createHmac, timingSafeEqual } from 'crypto';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationError, EmptyResultError } from 'sequelize';

import { AppError, CreateErr } from '../../types';

const sigHashAlg = 'sha256';
const sigHeaderName = 'X-Hub-Signature-256';
const secret = process.env.SECRET || 'secret';

export const createError: CreateErr = (
	message,
	code = 403,
	validations = null
) => {
	const err = new Error(message);
	// @ts-ignore
	err.code = code;
	// @ts-ignore
	err.validations = validations;
	return err;
};

export const success = (msg: string, data: any, meta?: object) => ({
	data,
	status: true,
	message: msg,
	...(meta && { meta })
});

export function verifyWebhook(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (!req.body) {
		return next('Request body empty');
	}
	const data = JSON.stringify(req.body);
	const hmac = createHmac(sigHashAlg, secret);
	const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8');

	const digest = Buffer.from(
		`${sigHashAlg}=${hmac.update(data).digest('hex')}`,
		'utf8'
	);
	if (sig.length !== digest.length || !timingSafeEqual(digest, sig)) {
		return next(
			`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`
		);
	}
	return next();
}

export function errorHandler(
	error: AppError,
	_req: any,
	res: Response,
	_next: any
) {
	try {
		if (error.validations) {
			return res.status(422).json({
				status: false,
				message: 'All fields are required',
				data: error.validations
			});
		}

		let code = error.code || 500;
		let msg = error.message;

		if (!code) {
			if (error instanceof ValidationError) {
				code = 422;
			} else if (error instanceof EmptyResultError) {
				code = 404;
				msg = 'The resource requested was not found';
			} else {
				code = 500;
				msg = error.message || 'Operation failed.';
			}
		}

		console.log(error.name || 'Error', error.message);

		return res.status(code || 500).json({ status: false, message: msg });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ status: false });
	}
}

export const validate = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			return next();
		}

		const extractedErrors = [];
		errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

		throw createError('Validation failed', 400, extractedErrors);
	} catch (e) {
		return next(e);
	}
};
