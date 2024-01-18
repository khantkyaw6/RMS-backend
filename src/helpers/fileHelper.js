const path = require('path');
const fs = require('fs');
const rootDir = path.join(__dirname, '../../');

const deleteFile = (fileName) => {
	fs.unlink(path.join(rootDir, fileName), (err) => {
		if (err) console.log(err);
	});
};

module.exports = { rootDir, deleteFile };
