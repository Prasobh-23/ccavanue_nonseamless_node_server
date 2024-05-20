let ccav = require('./ccavutil.js');

exports.postReq = function (req, res) {

    let body = '',
        workingKey = "your workingKey",	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = "your accessCode",	//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';

    body = req.body;

    // Convert JSON data to string beacuse the req body should be in this format 
    //"merchant_id=XXXXX&order_id=0001&currency=INR&amount=6000.00&redirect_url=http:/ccavResponse&cancel_url=ccavResponse&language=EN"
    body = Object.keys(body).map(key => `${key}=${encodeURIComponent(body[key])}`).join('&');


    encRequest = ccav.encrypt(body, workingKey);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';

    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(formbody);
    res.end();
};