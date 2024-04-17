import NextAuth from "next-auth"

import {publicRoutes, authAPIPrefix, DEFAULT_Login_Redirect, authRoutes } from "@/routes"

import { auth } from "@/auth";

export default auth((req) => {
  // req.auth
  const isLoogedIn = !!req.auth;

  const {nextUrl } = req;
  const url = nextUrl.clone();
  
  const isAuthAPIRoutes = nextUrl.pathname.startsWith(authAPIPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

  if(isAuthAPIRoutes) return null;

  if(isAuthRoutes){
    if(isLoogedIn){
      url.pathname = DEFAULT_Login_Redirect;
      return Response.redirect(url)
    }
    return null;
  }
  
  if(!isLoogedIn && !isPublicRoutes){
    url.pathname = "/auth/login";
    return Response.redirect(url)
    // return Response.redirect(new URL("/auth/login", nextUrl))
  }
  return null
 })

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/login"],
}