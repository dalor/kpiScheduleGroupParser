const schedule_parser = require('./kpiScheduleGroupParser');
const url_parser = require('url');

module.exports = (req, res) => {
    const group = url_parser.parse(req.url, true).query.group;
    if (group) {
        schedule_parser(group,
        (first, second) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([first, second]));
        },
        () => {
            res.statusCode = 404;
            res.end('Nope');
        })
    }
    else {
        res.end('?group=GROUP_ID');
    }
}
