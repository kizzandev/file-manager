import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function someMiddleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

const isProtectedRoute = createRouteMatcher(["/f(.*)", "/drive"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/ingest(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  else if (!isPublicRoute(req)) return someMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
