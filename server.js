require('dotenv').config()
const express = require('express');
const favicon = require('serve-favicon')
const engine = require('ejs-locals');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require("path");
const { rateLimiterRoute } = require('./utils/utils.js')
const { PORT, API_VERSION } = process.env
const app = express();

// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

app.use(cors());

app.engine('ejs', engine);
app.set('views', './server/views');
app.set('view engine', 'ejs');


// Route
app.use('/api/' + API_VERSION, [
    require('./server/routes/job_route'),
    require('./server/routes/company_route'),
    require('./server/routes/user_route'),
    require('./server/routes/follow_route')
]);

app.use('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "public", "job.html"))
    // res.send('jobDetail')
    // res.send('hi')
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})