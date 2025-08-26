import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEYS } from "@shared/utils/cookie";
import { GUARD_ROUTES, PATHS } from "@shared/path";

export function middleware(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
    const pathname = request.nextUrl.pathname;

    if (!refreshToken) {
      const isGuardRoute = GUARD_ROUTES.some((route) => {
        if (route === "/") {
          return pathname === route;
        }

        return pathname.startsWith(route);
      });

      if (isGuardRoute) {
        return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 수정 X
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
