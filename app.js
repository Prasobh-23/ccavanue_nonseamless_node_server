let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('morgan'),
    ccavReqHandler = require('./ccavanue/ccavRequestHandler.js'),
    ccavResHandler = require('./ccavanue/ccavResponseHandler.js');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(cors());

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {
    res.send('This is my root route for testing');
});

app.get('/about', function (req, res) {
    res.render('dataFrom.html');
});

app.post('/ccavRequestHandler', function (req, res) {
    ccavReqHandler.postReq(req, res);
});

app.post('/ccavResponseHandler', function (req, res) {
    ccavResHandler.postRes(req, res);
});

app.listen(3001, () => {
    console.log("Server is running on PORT 3001");
});
