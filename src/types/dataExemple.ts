const exempleTimeline = {
    "data": [
        {
            "country": "Ukraine",
            "rewarded_period_days": 55,
            "reporting_period_days": 90,
            "rule_starting_from": "2020-01-01",
            "reporting_frequency": "Monthly",
            "before_start_date": "1 day before",
            "before_due_date": "1 day before",
            "after_due_date": "1 day after",
            "reporting_start_date": 0,
            "email_settings": "",
            "custom_reporting_dates":"1 day after",
            "reporting_due_date": 3,
 
            "country_old": "Ukraine",
            "rewarded_period_days_old": 15,
            "reporting_period_days_old": 90,
            "rule_starting_from_old": "2020-01-01",
            "reporting_frequency_old": "Monthly",
            "before_start_date_old": "1 day before",
            "before_due_date_old": "1 day before",
            "after_due_date_old": "1 day after",
            "reporting_start_date_old": 0,
            "email_settings_old": "",
            "custom_reporting_dates_old": "test",
            "reporting_due_date_old": 3
        }
    ]
}

const dataTest1 = [
    {
      name: "daily",
      periodsSettings: {},
      notificationRules: {
        // noties Monday = 0, Th=1
        afterReportingDueDate: [1, 2, 3, 4, 5],
      },
    },
    {
      name: "weekly",
      periodsSettings: {
        dueDay: "Friday",
      },
      notificationRules: {
        afterReportingDueDate: [1, 3, 5],
        beforeReportingDueDate: [
          { label: "on due Date", selected: false, value: 0, id: "02092" },
          { label: "1 day before", selected: true, value: 1, id: "02093" },
        ],
      },
    },
    {
      name: "monthly",
      periodsSettings: {
        startDay: 1,
        dueDay: 30,
      },
      notificationRules: {
        afterReportingDueDate: [1, 3, 5],
        beforeReportingDueDate: [
          { label: "on due Date", selected: false, value: 0, id: "323f2" },
          { label: "1 day before", selected: true, value: 1, id: "0233293" },
        ],
        beforeReportingStartDate: [
          { label: "on start Day", selected: false, value: 0, id: "323w2" },
        ],
      },
    },
    {
      name: "quarterly",
      periodsSettings: {
        startDay: 1,
        dueDay: 30,
      },
      notificationRules: {
        afterReportingDueDate: [1, 2, 4, 5],
        beforeReportingDueDate: [
          { label: "on due Date", selected: false, value: 0, id: "323fee2" },
          { label: "1 day before", selected: true, value: 1, id: "0233293" },
        ],
        beforeReportingStartDate: [
          { label: "on start Day", selected: false, value: 0, id: "323wee2" },
        ],
      },
    },
    {
      name: "custom",
      periodsSettings: [
        {
          // DD-MM-YYYY
          id: "2024-01-01_2024-01-31",
          startPeriod: "01-01-2024",
          endPerioud: "22-02-2024",
          startDay: 1,
          dueDay: 31,
        },
        {
          id: "2024-02-01_2024-02-28",
          startPeriod: "02-04-2024",
          endPerioud: "22-06-2024",
          startDay: 1,
          dueDay: 28,
        },
      ],
      notificationRules: {
        afterReportingDueDate: [1, 2, 4, 5],
        beforeReportingDueDate: [
          { label: "on due Date", selected: false, value: 0, id: "323fee2" },
          { label: "1 day before", selected: true, value: 1, id: "0233293" },
        ],
        beforeReportingStartDate: [
          { label: "on start Day", selected: false, value: 0, id: "323wee2" },
        ],
      },
    },
  ];


const analogyDictionary = {
    reportingFrequency: 'reporting_frequency',
    startDay: 'reporting_start_date',
    dueDay: 'reporting_due_date',
    afterReportingDueDate: 'after_due_date',
    beforeReportingDueDate: 'before_due_date',
    beforeReportingStartDate: 'before_start_date'

}


const fieldsForInterecting = {
    "data": [
        {
            "country": "Ukraine",
            "rewarded_period_days": 55,
            "reporting_period_days": 90,
            "rule_starting_from": "2020-01-01",
            "reporting_frequency": "Monthly", // !
            "before_start_date": "1", //!
            "before_due_date": "2", //!
            "after_due_date": "3", //!
            "reporting_start_date": 1, // !
            "email_settings": "",
            "reporting_due_date": 3, // !
            "report_type": "sellout",
            "custom_periods": ["01.07.2024-01.08.2024,01.08.2024-01.10.2024,01.10.2024-01.12.2024"],
 
            "country_old": "Ukraine",
            "rewarded_period_days_old": 15,
            "reporting_period_days_old": 90,
            "rule_starting_from_old": "2020-01-01",
            "reporting_frequency_old": "Monthly",
            "before_start_date_old": "1 day before",
            "before_due_date_old": "1 day before",
            "after_due_date_old": "1 day after",
            "reporting_start_date_old": 0,
            "email_settings_old": "",
            "custom_reporting_dates_old": "test",
            "reporting_due_date_old": 3
        }
    ]
}


 export {};