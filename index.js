const schedule_parser = require('./kpiScheduleGroupParser');
const url_parser = require('url');

module.exports = (req, res) => {
    let result = '';
    const group = url_parser.parse(req.url, true).query.group;
    if (group) {
        schedule_parser(group, (first, second) => {
            res.setHeader('Content-Type', 'application/json');
            result = JSON.stringify([first, second])
        })
    }
    if (result) {
        res.end(result);
    }
    else {
        res.statusCode = 404;
        res.end('Nope');
    }
}
