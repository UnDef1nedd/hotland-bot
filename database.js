const fs = require('fs');

let guilds = {};

const load = (path) => {
	console.log('Загрузка базы данных...');
	let data = { guilds: {} };
	if (fs.existsSync(path)) {
		data = JSON.parse(fs.readFileSync(path).toString());
	}
	guilds = data.guilds;
	console.log('База данных успешно загружена!');
}

const save = (path) => {
	console.log('Сохранение базы данных...');
	fs.writeFileSync(path, JSON.stringify({ guilds }, null, 4));
	console.log('База данных успешно сохранена!');
}

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: '!',
			mroleID: "",
			accounts: {},
		}
	}
	return guilds[guild.id];
}

const getAccount = (member) => {
	const g = getGuildData(member.guild);
	if (!g.accounts[member.id]) {
		g.accounts[member.id] = {
			admin: "",
			newspic: "",
			warns: 0,
			notes: ""
		}
	}
	return g.accounts[member.id];
}

module.exports = {
	load,
	save,
	getGuildData,
	getAccount,
}
