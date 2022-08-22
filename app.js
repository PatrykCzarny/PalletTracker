const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const {
    routerList,
    routerHeatmap,
    routerSettings,
    routerArchive,
    routerDelivery,
    routerMain,
    routerError,
} = require('./routes/views');

const {
    routerUpdate,
    routerSwap,
} = require('./routes/utils');


const app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/list', routerList);
app.use('/heatmap', routerHeatmap);
app.use('/settings', routerSettings);
app.use('/archive', routerArchive);
app.use('/delivery', routerDelivery);
app.use('/mainPage', routerMain);
app.use('/', routerError);

app.use('/grid', routerUpdate);
app.use('/swap', routerSwap);


app.listen(3000);