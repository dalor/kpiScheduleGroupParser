const http = require('http')
const url_parser = require('url')
const querystring = require('querystring');
const DOMParser = require('xmldom').DOMParser;

const hostname = 'rozklad.kpi.ua'

const ShowHiddenValues = (funct) => {
    const options = {
        hostname: hostname,
        path: '/Schedules/ScheduleGroupSelection.aspx',
        method: 'GET'
      };
    http.request(options, (res) => {
        let page = '';
        res.on('data', (chunk) => {
            page += chunk;
        });
        res.on('end', () => {
            const doc = new DOMParser().parseFromString(page);
            const hidden_values = {
                '__VIEWSTATE': doc.getElementById('__VIEWSTATE').getAttribute('value'),
                '__EVENTVALIDATION': doc.getElementById('__EVENTVALIDATION').getAttribute('value')
            };
            funct(hidden_values);
        })
    }).end();
}

const ShowScheduleUrl = (group, type, hidden_values, funct) => {
    hidden_values.ctl00$MainContent$ctl00$txtboxGroup = group;
    hidden_values.ctl00$MainContent$ctl00$btnShowSchedule = type;
    const postData = querystring.stringify(hidden_values);
    const options = {
        hostname: hostname,
        path: '/Schedules/ScheduleGroupSelection.aspx',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
    const req = http.request(options, (res) => {
        const rurl = url_parser.parse(res.headers.location);
        rurl.hostname = hostname;
        funct(rurl);
    })
    req.write(postData);
    req.end();  
}

const OptimizeValue = (element) => {
    const as = element.getElementsByTagName('a');
    if (as.length) {
        return as[0].textContent;
    }
    else {
        return null;
    }
}

const ParseWeek = (table) => {
    const table_rows = table.getElementsByTagName('tr');
    const result = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}};
    for (let r = 1; r <= 5; r++){
        const row = table_rows[r].getElementsByTagName('td');
        for (let d = 1; d < 7; d++){
            result[d-1][r-1] = OptimizeValue(row[d]);
        }
    }
    return result;
}

const ParseTables = (url, funct) => {
    http.request(url, (res) => {
        let page = '';
        res.on('data', (chunk) => {
            page += chunk;
        })
        res.on('end', () => {
            const doc = new DOMParser({errorHandler: {warning: () => {}}}).parseFromString(page); //We need less warnings
            funct(
                ParseWeek(doc.getElementById('ctl00_MainContent_FirstScheduleTable')),
                ParseWeek(doc.getElementById('ctl00_MainContent_SecondScheduleTable'))
            );          
        })
    }).end();
}

module.exports = (group, funct) => {
    ShowHiddenValues((hidden_values) => {
        ShowScheduleUrl(group, 'Розклад занять', hidden_values, (url) => {
            ParseTables(url, (first, second) => {
                funct(first, second);
            })
        })
    })
}

