const models = require('/src/db/models/index');

export async function GET(request) {
	const job = await models.students.findAll();

	return new Response(JSON.stringify(job), {
		status: 200,
	});
} 