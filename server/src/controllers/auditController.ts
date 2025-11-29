import type { NextFunction, Request, Response } from "express";
import { auditPage } from "../services/auditService.js";
import { logger } from "../utils/logger.js";

export async function auditWebsiteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { url } = req.body;

    logger.info({ url }, "Received audit request");

    const result = await auditPage(url);

    logger.info({ url }, "Audit completed");

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error({ error }, "Audit failed");
    next(error);
  }

  // // TEMPORARY test crash
  // throw new Error("test crash");

  // const result = await auditPage(url);
  // return res.status(200).json({ success: true, data: result });
  // // try {
  // //   const { url } = req.body;
  // //   throw new Error("test crash");
  // //   // // Validate the url
  // //   // if (!url) {
  // //   //   return res.status(400).json({ success: false, error: "URL is required" });
  // //   // }

  // //   // try {
  // //   //   new URL(url);
  // //   // } catch (error) {
  // //   //   return res
  // //   //     .status(400)
  // //   //     .json({ success: false, error: "Invalid URL format" });
  // //   // }
  // //   const result = await auditPage(url);
  // //   return res.status(200).json({ success: true, data: result });
  // // } catch (error) {
  // //   console.error("Audit error", error);
  // //   return res
  // //     .status(500)
  // //     .json({ sucess: false, error: "Failed to audit website" });
  // // }
}
