import request from '@/utils/request'
//商铺列表
export function getStoreList(data) {
  return request({
    url: '/tenant/page',
    method: 'post',
    data
  })
}
//厂商列表
export function getFactoryList(data) {
  return request({
    url: '/factory/page',
    method: 'post',
    data
  })
}
//产品列表
export function getProductList(data) {
  return request({
    url: '/product/page',
    method: 'post',
    data
  })
}
//设备device/infoPage
export function getDevice(data) {
  return request({
    url: '/device/infoPage',
    method: 'post',
    data
  })
}
//升级包softupgradepackage/page
export function softList(data) {
  return request({
    url: '/softupgradepackage/page',
    method: 'post',
    data
  })
}
//OTA列表
export function getOtaList(data) {
  return request({
    url: '/task/pageInfo',
    method: 'post',
    data
  })
}
//OTA详情
export function getOtaDetail(data) {
  return request({
    url: `task/pageTaskDetail`,
    method: 'post',
    data
  })
}


