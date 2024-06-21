export function middleware(request) {
	const currentUser = request.cookies.get('current-user')?.value;

	if (!currentUser && request.nextUrl.pathname.startsWith('/upload')) {
		const url = new URL('/login', request.url);
		url.searchParams.set('redirect', new URL(request.url).pathname);

		return Response.redirect(url);
	}

	if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
		const path = request.nextUrl.searchParams.get('redirect');

		let url;
		if (path) {
			url = new URL(path, request.url);
		} else {
			url = new URL("/", request.url);
		}

		return Response.redirect(url);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}