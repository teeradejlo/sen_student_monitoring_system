import { cookies } from "next/headers";

export async function GET(request) {
	cookies().delete("current-user");

	return new Response(JSON.stringify({}), {
		status: 200,
	});
}