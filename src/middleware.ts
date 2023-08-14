import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("=======>",request.url)
    try {
      let token : any = request.cookies.get('token')
      token = token?.value || null
      if(!token){
        throw new Error("Not Logged in")
      }
      console.log(token)
      const response = NextResponse.next();
      return response
    } catch (error) {
      return Response.redirect(new URL('/login', request.url))
    }
    
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*']
}