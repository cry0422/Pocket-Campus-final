const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1;
  if(month<10){
    month = 0+String(month)
  }
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()
  return year+'-'+month+'-'+day+'-'+hour+':'+min
}

module.exports = {
  formatTime: formatTime,
  formatDay: formatDay
}
