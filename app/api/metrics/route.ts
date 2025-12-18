// app/api/metrics/route.ts
/**
 * Metrics Endpoint
 * Provides application metrics for monitoring
 */

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Metrics {
  timestamp: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  };
  cpu: {
    user: number;
    system: number;
  };
  process: {
    pid: number;
    platform: string;
    nodeVersion: string;
  };
  environment: string;
}

// ============================================
// GET HANDLER
// ============================================

/**
 * Returns application metrics
 * Can be scraped by Prometheus or other monitoring tools
 */
export async function GET(): Promise<NextResponse> {
  try {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const metrics: Metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
        arrayBuffers: Math.round(memoryUsage.arrayBuffers / 1024 / 1024),
      },
      cpu: {
        user: Math.round(cpuUsage.user / 1000), // microseconds to milliseconds
        system: Math.round(cpuUsage.system / 1000),
      },
      process: {
        pid: process.pid,
        platform: process.platform,
        nodeVersion: process.version,
      },
      environment: process.env.NODE_ENV || "development",
    };

    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error("Metrics collection failed:", error);
    
    return NextResponse.json(
      {
        error: "Failed to collect metrics",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
