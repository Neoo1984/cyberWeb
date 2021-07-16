/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
/**
 * @param {string} date
 * @returns {string}
 */
export function renderTime(date) {
  if (date != null){
    let time = new Date(date).toJSON();
    return new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  }else {
    return '--'
  }
}
//设备是否在线 isOnline: 0：离线 1：上线
export function renderIsOnline(row, column, cellValue) {
  return row.isOnline === '1' ? '在线' : '离线'
}
/*ota状态 otaStatus:
1.ota指令下发中
2.ota指令下发成功 --收到设备通知
3.升级包下载中
4.升级包下载成功
5.升级包下载失败
6.设备固件更新中
7：设备固件更新失败
8：设备固件更新部分成功
9：设备固件更新成功*/
export function renderOtaStatus(row, column, cellValue) {
  switch (row.otaStatus) {
    case '1':
      return 'ota指令下发中'
    case '2':
      return 'ota指令下发成功'
    case '3':
      return '升级包下载中'
    case '4':
      return '升级包下载成功'
    case '5':
      return '升级包下载失败'
    case '6':
      return '设备固件更新中'
    case '7':
      return '设备固件更新失败'
    case '8':
      return '设备固件更新部分成功'
    case '9':
      return '设备固件更新成功'
    case '10':
      return 'ota超时'
    default:
      return '无数据'
  }
}
/*
* 渲染进度
* */
export function renderProgress(row, column, cellValue){
  if (row.downloadProgress !== null&& row.downloadProgress !== ''){
    return row.downloadProgress + '%'
  }else {
    return '--'
  }
}
/*
* 指令结果
* */
export function renderCmdResult(row, column, cellValue) {
  switch (row.cmdResult) {
    case '0':
      return '正确应答'
    case '1':
      return '无效报文'
    case '2':
      return '校验错误'
    case '3':
      return '指令超时'
    case '4':
      return '操作不必要'
    case '5':
      return '设备忙，无法操作'
    default:
      return '无数据'
  }
}
export function renderCmdStatus(row, column, cellValue) {
  return row.isOnline === "1" ? '发送成功' : '收到设备回执通知'
}
//渲染设备类型
export function renderType(row, column, cellValue) {
  return row.deviceType === '1' ? '电池' : row.deviceType === '2' ? '换电柜' : '两轮车'
}
export function renderSubType(deviceType) {
  return deviceType === '1' ? '电池' : deviceType === '2' ? '换电柜' : '两轮车'
}
// 指令类型 cmdType: 1:OTA指令 2：设备OTA版本查询 3：设备固件升级
// 指令状态 cmdStatus: 1:发送成功 2：受到设备回执通知
// 执行结果 cmdResult: 0: 正确应答 1:无效报文 2：校验错误 3：指令超时 4：操作不必要 5：设备忙，无法操作
export function renderCmdType(row, column, cellValue) {
  return row.deviceType === '1' ? 'OTA指令' : row.deviceType === '2' ? '设备OTA版本查询' : '设备固件升级'
}
/*
任务状态
1 已创建
2 创建失败（设备响应）
3 执行中
4 已中止
5 已结束
*/
export function renderTaskStatus(taskStatus) {
  switch (taskStatus) {
    case 0:
      return '任务开始'
    case 1:
      return '任务中止'
    case 2:
      return '任务恢复'
    case 3:
      return '任务删除'
    case 4:
      return '任务结束'
    default:
      return '--'
  }
}
export function renderSendStatus(sendStatus) {
  switch (sendStatus) {
    case '0':
      return '失败'
    case '1':
      return '成功'
    default:
      return '--'
  }
}
/*
任务操作
1 终止
2 恢复
*/
export function renderTaskOperate(operateType) {
  switch (operateType) {
    case '1':
      return '终止'
    case '2':
      return '恢复'
  }
}
/*
任务状态
1 已创建
2 创建失败（设备响应）
3 执行中
4 已中止*/
export function renderOtaUpdateStatus(row, column, cellValue) {
  switch (row.taskStatus) {
    case 1:
      return '已创建'
    case 2:
      return '创建失败'
    case 3:
      return '执行中'
    case 4:
      return '已中止'
    default:
      return '无数据'
  }
}
/*
用户状态
1 注销
0 正常
*/
export function renderDelete(row, column, cellValue) {
  switch (row.isDelete) {
    case '1':
      return '已注销'
    case '0':
      return '正常'

  }
}
/*
用户角色
1 注销
0 正常
*/
export function renderRole(row, column, cellValue) {
  switch (row.userRole) {
    case '1':
      return '超级管理员'
    case '2':
      return '一般管理员'
    case '3':
      return '用户'

  }
}
