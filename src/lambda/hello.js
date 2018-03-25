require('dotenv').config()
const APIKEY = process.env.meetup_api_key
const fetch = require('isomorphic-fetch')

export async function handler(event, context, callback) {
  console.log(event)

  console.info('called');

  const body = await getPage({start_date_range: '2018-03-24T00:00:00'})
  console.info('body', body);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body, null, 2)
  })
}


async function getPage ({start_date_range}) {
  const paramsObject = {
    lat: 37.771707,
    lon: -122.405377,
    radius: 5,
    order: 'time',
    page: 500,
    key: APIKEY,
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
    const res = await fetch(url)
    console.info('res', res);
    // console.info('res', res.body);
    // text = await res.text()
    // const parsed = JSON.parse(text)
    return res.json()
  } catch (err) {
    console.info('err', err);
    return err
  }
}
handler()
