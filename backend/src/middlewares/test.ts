import { Request, Response, NextFunction } from "express";

const testMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || '서버 내부 오류';

    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

    res.status(status).json({ success: false, message });
};

export default testMiddleware;