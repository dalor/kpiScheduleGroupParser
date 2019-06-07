const schedule_parser = require('./kpiScheduleGroupParser')

schedule_parser('ІС-73', (first, second) => {
    console.log('First:');
    console.log(first);
    console.log('\nSecond:');
    console.log(second);
})