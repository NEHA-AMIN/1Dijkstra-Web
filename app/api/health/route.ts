// app/api/health/route.ts
/**
 * Health Check Endpoint
 * Used for container health checks and monitoring
 */

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  checks: {
    api: boolean;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
  };
}

// ============================================
// GET HANDLER
// ============================================

/**
 * Health check endpoint
 * Returns 200 OK if service is healthy
 * Returns 503 Service Unavailable if unhealthy
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Calculate memory usage
    const memoryUsage = process.memoryUsage();
    const totalMemory = memoryUsage.heapTotal;
    const usedMemory = memoryUsage.heapUsed;
    const memoryPercentage = Math.round((usedMemory / totalMemory) * 100);

    // Check if API key is configured
    const apiKeyConfigured = !!process.env.GEMINI_API_KEY;

    // Build health status
    const health: HealthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      checks: {
        api: apiKeyConfigured,
        memory: {
          used: Math.round(usedMemory / 1024 / 1024), // MB
          total: Math.round(totalMemory / 1024 / 1024), // MB
          percentage: memoryPercentage,
        },
      },
    };

    // Determine if unhealthy
    if (!apiKeyConfigured || memoryPercentage > 90) {
      health.status = "unhealthy";
      return NextResponse.json(health, { status: 503 });
    }

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error("Health check failed:", error);
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
