import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPrivetRoute = createRouteMatcher(["/"]);

const setCorsHeaders = (response: NextResponse, origin: string | null): NextResponse => {
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin ?? "");
    return response;
};
export const middleware = clerkMiddleware(async (auth, req: NextRequest) => {
    const origin = req.headers.get("origin");
    if (isPrivetRoute(req)) await auth.protect();

    const response = NextResponse.next();
    return setCorsHeaders(response, origin);
});

export default middleware;
