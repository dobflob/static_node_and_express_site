const express = require('express');
const app = express();

app.set('view engine', 'pug');

const routes = require('./routes');
app.use(routes);

app.use('/static', express.static('public', { redirect: false }));

app.use((req, res) => {
    if (res.status !== 200) {
        const err = new Error();
        err.message = "Page Not Found";
        err.status = 404;
        console.log(`${err.status} | ${err.message}`);
        res.render('page-not-found', { err });
    } 
});

app.use((err, req, res, next) => {
    res.locals.error = new Error('Internal Server Error');
    res.locals.status = 500;
    res.locals.stack = err.stack;
    console.log(`${res.locals.status} | ${res.locals.stack}`);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});