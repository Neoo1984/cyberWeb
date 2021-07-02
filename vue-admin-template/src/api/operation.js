import request from '@/utils/request'
//商户新增
export function createStore(data) {
  return request({
    url: 'tenant/save',
    method: 'post',
    data
  })
}

//商户修改
export function updateStore(data) {
  return request({
    url: 'tenant/update',
    method: 'put',
    data
  })
}
//商户删除
export function deleteStore(id) {
  return request({
    url: `tenant/delete/`,
    method: 'delete',
    params:{tenantId:id}
  })
}
//厂商新增
export function createFactory(data) {
  return request({
    url: 'factory/save',
    method: 'post',
    data
  })
}
//厂商修改
export function updateFactory(data) {
  return request({
    url: 'factory/update',
    method: 'put',
    data
  })
}
//厂商删除
export function deleteFactory(id) {
  return request({
    url: `factory/delete`,
    method: 'delete',
    params:{factoryId:id}
  })
}
//厂商名称factory/getFactoryNameList
export function getFactoryNameList() {
  return request({
    url: 'factory/getFactoryNameList',
    method: 'get',
  })
}

//产品新增
export function createProduct(data) {
  return request({
    url: 'product/save',
    method: 'post',
    data
  })
}
//产品update
export function updateProduct(data) {
  return request({
    url: 'product/update',
    method: 'put',
    data
  })
}
//产品信息下拉product/queryProductModelList
export function queryProductModelList(data) {
  return request({
    url: 'product/queryProductModelList',
    method: 'put',
    data
  })
}
//产品删除
export function deleteProduct(id) {
  return request({
    url: `product/delete`,
    method: 'delete',
    params:{productId:id}
  })
}

//设备新增
export function createDevice(data) {
  return request({
    url: 'device/deviceInfoSave',
    method: 'post',
    data
  })
}
//设备update
export function updateDevice(data) {
  return request({
    url: 'device/infoUpdateById',
    method: 'put',
    data
  })
}
//设备删除
export function deleteDevice(id) {
  return request({
    url: `device/delete`,
    method: 'delete',
    params:{deviceId:id}
  })
}
//设备上传
export function massSave(data) {
  return request({
    url: 'device/massSave',
    method: 'post',
    data
  })
}
//设备下载device/massSaveResult
export function downloadFile(query) {
  return request({
    url: 'device/massSaveResult',
    method: 'post',
    params:query,
    responseType:'blob',
  })
}
//设备状态queryDeviceStatus
export function queryDeviceStatus(data) {
  return request({
    url: 'device/queryDeviceStatus',
    method: 'post',
    data
  })
}
//下发ota,command/otaSend
export function otaSend(data) {
  return request({
    url: 'command/otaSend',
    method: 'post',
    data
  })
}
//OTA任务导出表格
export function exportExcel(data) {
  return request({
    url: 'task/outputTaskDetail',
    method: 'post',
    data
  })
}

//获取所有硬件
export function queryHardVersion(data) {
  return request({
    url: 'softupgradepackage/queryHardVersion',
    method: 'post',
    data
  })
}
//cmdPage
export function cmdPage(data) {
  return request({
    url: 'device/cmdPage',
    method: 'post',
    data
  })
}
//升级包新增softupgradepackage/save
export function softSave(data) {
  return request({
    url: 'softupgradepackage/save',
    method: 'post',
    data
  })
}
//升级包update
export function softUpdate(data) {
  return request({
    url: 'softupgradepackage/update',
    method: 'put',
    data
  })
}
//升级包删除
export function deleteSoft(id) {
  return request({
    url: `softupgradepackage/delete`,
    method: 'delete',
    params:{objectId:id}
  })
}

