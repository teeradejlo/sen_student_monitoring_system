const models = require('/src/db/models/index');

export async function GET(request) {
	const job = await models.teachers.findAll();

	return new Response(JSON.stringify(job), {
		status: 200,
	});
} 