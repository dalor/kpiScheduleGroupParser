# kpiScheduleGroupParser [![Build Status](https://travis-ci.org/dalor/kpiScheduleGroupParser.svg?branch=master)](https://travis-ci.org/dalor/kpiScheduleGroupParser)

**Simple api to get clear schedule from [http://rozklad.kpi.ua](http://http://rozklad.kpi.ua "http://rozklad.kpi.ua")**

Just use 

`?group=GROUP_ID`

And you wil get such answer:
```json
[
	[
		[ 
			{ 
				"subject": {
					"text": ... ,
					"url": ...
				}
				"teachers": [
					{
						"text": ... ,
						"url": ...
					},
					
				]
				"places": [
					{
						"text": ... ,
						"url": ...
					},
					
				]
			}
			
		]
		
	],
	[ 
		.... 
	]
]
```
If there is no lesson, it will be `null`
