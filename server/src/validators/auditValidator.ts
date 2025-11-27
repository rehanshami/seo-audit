import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const auditRequestSchema = z.object({
  url: z.url({ message: "Invalid URL format" }),
});

export function validateAuditRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parseResult = auditRequestSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: parseResult.error?.issues[0]?.message,
    });
  }

  req.body = parseResult.data;

  next();
}

// validate that url exists
// ensure it’s a string
// ensure it’s a valid URL format
// produce typed inference
// integrate with Express as middleware
