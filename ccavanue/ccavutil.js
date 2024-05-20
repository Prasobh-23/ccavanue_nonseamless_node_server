var crypto = require('crypto');
exports.encrypt = function (plainText, workingKey) {

	let md5 = crypto.createHash('md5').update(workingKey).digest();
	let keyBase64 = Buffer.from(md5).toString('base64');
	let iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

	const key = Buffer.from(keyBase64, 'base64');
	iv = Buffer.from(iv, 'base64');

	let cipher = crypto.createCipheriv(getAlgorithm(key), key, iv);
	let encoded = cipher.update(plainText, 'utf8', 'hex');
	encoded += cipher.final('hex');
	
	return encoded;
};

exports.decrypt = function (encText, workingKey) {

	let md5 = crypto.createHash('md5').update(workingKey).digest();
	let keyBase64 = Buffer.from(md5).toString('base64');
	let iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

	const key = Buffer.from(keyBase64, 'base64');
	iv = Buffer.from(iv, 'base64');

	var decipher = crypto.createDecipheriv(getAlgorithm(key), key, iv);
	var decoded = decipher.update(encText, 'hex', 'utf8');
	decoded += decipher.final();
	
	return decoded;
};


function getAlgorithm(keyBase64) {
	var key = Buffer.from(keyBase64, 'base64');
	switch (key.length) {
		case 16:
			return 'aes-128-cbc';
		case 32:
			return 'aes-256-cbc';
	}
	throw new Error('Invalid key length: ' + key.length);
}
