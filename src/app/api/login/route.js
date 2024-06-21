import { cookies } from "next/headers";

const models = require('/src/db/models/index');

export async function POST(request) {
	await new Promise(r => setTimeout(r, 2000));

	const data = await request.json();

	const job = await models.users.findOne({
		where: {
			username: data.username,
			password: data.password,
		}
	});

	if (job === null) {
		return new Response(JSON.stringify({}), {
			status: 401,
		});
	} else {
		cookies().set("current-user", data.username);

		return new Response(JSON.stringify({}), {
			status: 200,
		});
	}
}