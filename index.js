const schedule_parser = require('./kpiScheduleGroupParser');
const http = require('http');
const url_parser = require('url');

const serv = http.createServer((req, res) => {
    const group = url_parser.parse(req.url, true).query.group;
    if (group) {
        schedule_parser(group, (first, second) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([first, second]));
        })
    }
})

serv.listen(8080);