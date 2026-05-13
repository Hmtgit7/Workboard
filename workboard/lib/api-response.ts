import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json<ApiResponse>({ success: false, error }, { status });
}

export function unauthorizedResponse() {
  return errorResponse('Unauthorized', 401);
}

export function forbiddenResponse() {
  return errorResponse('Forbidden — insufficient permissions', 403);
}

export function notFoundResponse(entity = 'Resource') {
  return errorResponse(`${entity} not found`, 404);
}
