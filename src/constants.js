export const STORAGE_DATA_KEY = "CAMPAIGN_LIST";

export const CAMPAIGN_TIMESTAMP = {
  PRESENT: 'present',
  PAST: 'past',
  FUTURE: 'future',
}

export const TAB_CONFIG = [
  { label: 'Upcoming Campaigns', value: CAMPAIGN_TIMESTAMP.FUTURE },
  { label: 'Live Campaigns', value: CAMPAIGN_TIMESTAMP.PRESENT },
  { label: 'Past Campaigns', value: CAMPAIGN_TIMESTAMP.PAST },
]

export const getVerbalDate = (dateString, yearRequired = false, dateOrdinal = false) => {
  let dt = new Date(dateString).toDateString().split(' ');
  let weekday = dt[0];
  let date = dt[2];
  let month = dt[1];
  let year = dt[3];

  const nth = function (date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  let tm = new Date(dateString).toLocaleTimeString().split(":");
  let hr = tm[0];
  let min = `0${tm[1]}`.slice(-2);
  let meridien = hr >= 12 ? 'pm' : 'am';

  hr = hr > 12 ? hr - 12 : hr;
  hr = `0${hr}`.slice(-2);
  return {
    weekday,
    verbalDate: `${date}${dateOrdinal ? nth(date) : ''} ${month} ${yearRequired ? year : ''}`,
    year,
    time: `${hr}:${min} ${meridien}`
  }
}