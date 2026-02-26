import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Skip user check if Supabase is not configured (e.g. during build)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return supabaseResponse
    }

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const isAdminSession = request.cookies.get('ckr_admin_session')?.value === 'true'
        const isAdmin = user?.email === 'emataranyika@gmail.com' || isAdminSession

        // Protect admin-only routes
        const isAdminRoute = request.nextUrl.pathname.startsWith('/sell') ||
            request.nextUrl.pathname.startsWith('/blog/create') ||
            request.nextUrl.pathname.includes('/edit')

        if (isAdminRoute && !isAdmin) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('redirectedFrom', request.nextUrl.pathname)
            return NextResponse.redirect(url)
        }

        // Redirect logged-in users away from /login
        if ((user || isAdminSession) && request.nextUrl.pathname.startsWith('/login')) {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    } catch (e) {
        // Ignore errors during user fetch in middleware
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}
