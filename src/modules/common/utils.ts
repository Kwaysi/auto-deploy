import { createHmac, timingSafeEqual } from 'crypto';
import { NextFunction, Request, Response } from 'express';

const sigHashAlg = 'sha256';
const sigHeaderName = 'X-Hub-Signature-256';
const secret = process.env.SECRET || 'secret';

export function authenticate(
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
