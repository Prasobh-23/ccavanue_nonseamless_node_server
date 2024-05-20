let ccav = require('./ccavutil.js')

exports.postRes = function (req, res) {
	let ccavEncResponse = '',
		ccavResponse = '',
		workingKey = 'your workingKey',	//Put in the 32-Bit key shared by CCAvenues.
		encryption;

	ccavEncResponse = req.body;
	encryption = ccavEncResponse.encResp;
	ccavResponse = ccav.decrypt(encryption, workingKey);

	let pData = '';
	pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
	pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
	pData = pData.replace(/&/gi, '</td></tr><tr><td>')
	pData = pData + '</td></tr></table>'
	htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
	res.writeHeader(200, { "Content-Type": "text/html" });
	res.write(htmlcode);
	res.end();
};