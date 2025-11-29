import { chromium } from "playwright";
import { msSince } from "../utils/timer.js";
import { logger } from "../utils/logger.js";
export interface AuditResult {
  url: string;
  statusCode: number | null;
  responseTime: number;
  metaTitle: string | null;
  metaDescription: string | null;
  h1: string[];
}

export async function auditPage(url: string): Promise<AuditResult> {
  const start = process.hrtime();
  logger.debug({ url }, "Launching browser for audit");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let statusCode: number | null = null;

  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });
    statusCode = response?.status() ?? null;
    const responseTime = msSince(start);

    const metaTitle = await page.title();

    const metaDescription = await page
      .$eval('meta[name="description"]', (el) => el.getAttribute("content"))
      .catch(() => null);

    const h1 = await page.$$eval("h1", (elements) =>
      elements.map((el) => el.textContent?.trim() || "")
    );

    await browser.close();
    logger.info({ url, statusCode, responseTime }, "Audit finished");
    return {
      url,
      statusCode,
      responseTime,
      metaTitle: metaTitle || null,
      metaDescription,
      h1,
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}
