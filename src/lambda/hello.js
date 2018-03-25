require('dotenv').config()
const _fetch = require('isomorphic-fetch')
const APIKEY = process.env.meetup_api_key

const fetch = async (url) => {
  const res = await _fetch(url)
  return await res.text()
}

async function handler(event, context, callback) {

  const body = await getPages(fetch, APIKEY)
  console.info('body.length', body.length);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body)
  })
}

/*PASTED BELOW*/

const moment = require('moment')
const getUrls = require('get-urls')

const FETCH_SIZE_LIMIT = 100

// A list of events which change the event
// date each time look like they have a big event
// and aggregate memers
const blackList = new Set([
  'qpqvxjyskbdb',
  'qrkqwjytcbcc',
  'qrwlqhytcbcc',
  '132309232',
  '55260062'
])

async function getPage (fetch, {start_date_range, key}) {
  const paramsObject = {
    lat: 37.771707,
    lon: -122.405377,
    radius: 5,
    order: 'time',
    page: 500,
    key,
    sign: true,
    fields: 'group_topics,series,group_membership_dues,group_category',
    start_date_range
  }
  const params = Object.keys(paramsObject)
    .map(key => `${key}=${paramsObject[key]}`)
    .join('&')
  console.info('params', params);
  // Documentation: https://www.meetup.com/meetup_api/docs/find/upcoming_events/
  const url = `https://api.meetup.com/find/upcoming_events?${params}`
  try {
    const text = await fetch(url)
    const res = JSON.parse(text)
    return res
  } catch (err) {
    console.info('err', err);
    return err
  }
}

const today_local_date = moment().format('YYYY-MM-DD')

async function getPages (fetch, apikey) {
  // let start_date_range = moment().format('YYYY-MM-DDTHH:mm:ss')
  let start_date_range = moment().format('YYYY-MM-DDT00:00:00')
  let total = 0
  let events = {}
  let prev_start_date_range = ''
  while (total < FETCH_SIZE_LIMIT && prev_start_date_range !== start_date_range) {
    let res = await getPage(fetch, {start_date_range, key: apikey})
    if (!res.events) { break }
    total += res.events.length
    let id, time, local_date, local_time, venue
    for (var event of res.events) {
      id = event.id; time = event.time; venue = event.venue
      local_date = event.local_date || local_date;
      local_time = event.local_time || local_time;
      events[id] = event
    }
    // TODO: optimize so that we hit cache
    // maybe use the ids to get the last one
    prev_start_date_range = start_date_range
    start_date_range = `${local_date}T${local_time}`
  }

  const hot = []
  for (let id in events) {
    let event = events[id]

    if (event.series || blackList.has(id)) {
      /**
       * ignore repeat events
       * as the rsvp counts are innacurate
       */
      delete events[id]
      continue
    }

    event.objectID = id

    let percent = event.yes_rsvp_count / event.rsvp_limit
    let isGettingFull = percent < 1 && percent > 0.75
    event.is_getting_full = isGettingFull
    event.is_popular = event.yes_rsvp_count > 70
    event.is_full = event.rsvp_limit && percent > 1
    event.percent = percent

    if (percent) {
      event.percent_full = (percent * 100).toFixed(0)
    }

    if (event.description) {
      const urls = getUrls(event.description)
      event.urls = urls
      event.is_paid = event.description.indexOf('a paid event') > -1
      for (let url of urls) {
        if (url.indexOf('eventbrite.com/') > -1) {
          if (!event.eventbrite_link || url < event.eventbrite_link) {
            event.eventbrite_link = url
          }
        } else if (url.indexOf('/forms') > -1) {
          if (!event.form_link || url < event.form_link) {
            event.form_link = url
          }
        }
      }
    }

    let isHot = isGettingFull || event.is_full || event.is_popular
    // let isHot = isGettingFull
    if (isHot) {
      event.is_hot = true
      delete event.description
      hot.push(event)
    }
  }
  console.info('hot', hot.length);
  return hot
}

module.exports = {
  handler,
  getPage,
  getPages
}

