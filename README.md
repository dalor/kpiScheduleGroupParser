# kpiScheduleGroupParser [![Build Status](https://travis-ci.org/dalor/kpiScheduleGroupParser.svg?branch=master)](https://travis-ci.org/dalor/kpiScheduleGroupParser)

**Simple api to get clear schedule from [http://rozklad.kpi.ua](http://http://rozklad.kpi.ua "http://rozklad.kpi.ua")**

Just use 

`?group=GROUP_ID`

And you wil get such answer:
``javascript
[
	[ // first week
		[ // Monday
			{ // 1 lesson
				"subject": {
					"text": ... ,
					"url": ...
				}
				"teachers": [
					{
						"text": ... ,
						"url": ...
					},
					... // list of teachers
				]
				"places": [
					{
						"text": ... ,
						"url": ...
					},
					... // list of places
				]
			}
			... // list of lessons from 1 to 5
		]
		... // list of weekdays [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
	],
	[ // second week
		.... // the same
	]
]
```
If there is no lesson, it will be `null`
