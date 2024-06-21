const models = require('/src/db/models/index');
const path = require('path');
const process = require('process');

const fs = require('fs');

export async function POST(request) {
	await new Promise(r => setTimeout(r, 2000));

	const formData = await request.formData();

	const data = {}
	for (const pairs of formData.entries()) {
		data[pairs[0]] = pairs[1];
	}

	const studentId = parseInt(data['student-name'].split(" ")[0]);
	const teacherId = parseInt(data['teacher-name'].split(" ")[0]);

	let ambData = await data["ambient-signals-data"].arrayBuffer();
	let wbData = await data["wristband-signals-data"].arrayBuffer();
	let emotData = await data["emotion-labels"].arrayBuffer();

	// insert to db
	const newSession = await models.sessions.create({ studentId: studentId, teacherId: teacherId });

	// save files to directory /public/upload/session/{id}/
	let dir = path.join(process.cwd(), "/public/upload/session", newSession.id.toString());
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const baseFilename = `${newSession.studentId}_${newSession.teacherId}_`;
	fs.writeFileSync(path.join(dir, baseFilename + "amb.csv"), Buffer.from(ambData));
	fs.writeFileSync(path.join(dir, baseFilename + "wb.csv"), Buffer.from(wbData));
	fs.writeFileSync(path.join(dir, baseFilename + "emot.csv"), Buffer.from(emotData));

	return new Response(JSON.stringify({ id: newSession.id }), {
		status: 200,
	});
} 