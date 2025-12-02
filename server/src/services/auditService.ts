import { chromium } from "playwright";
import { msSince } from "../utils/timer.js";
import { logger } from "../utils/logger.js";
export interface AuditResult {
  url: string;
  statusCode: number | null;
  responseTime: number;

  metaTitle: string | null;
  metaTitleLength: number | null;

  metaDescription: string | null;
  metaDescriptionLength: number | null;

  headings: {
    h1: string[];
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };

  brokenLinks: {
    url: string;
    status: number | null;
  }[];

  missingAlt: {
    src: string;
  }[];

  metaTags: {
    canonical: string | null;
    robots: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
  };

  performance: {
    domContentLoaded: number | null;
    loadEvent: number | null;
  };
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
