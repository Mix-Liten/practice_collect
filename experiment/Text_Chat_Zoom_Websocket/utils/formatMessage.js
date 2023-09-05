import moment from 'moment'

const formatMessage = (username, text) => ({
  username,
  text,
  time: moment().format('h:mm:ss a'),
})

export default formatMessage
