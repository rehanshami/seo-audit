import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
