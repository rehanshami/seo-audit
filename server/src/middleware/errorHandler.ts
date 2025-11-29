import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({ err }, "Unhandled error");

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
