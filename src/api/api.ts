import { service } from '@/utils/request'

export const LoginApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/admin/login`,
    data
  })
}

export const GetURLApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/project/v1/file/upload`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const AddStuApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/user/create/batch`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const CreateFatherApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task/create-parent`,
    data
  })
}

export const CreateSonApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task/create`,
    data
  })
}

export const getFacultyApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/faculty`
  })
}

export const getMajorApi = (id: string) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/major/faculty/${id}`
  })
}

export const getPastApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task/page`,
    data
  })
}
export const getPastChildApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task`,
    data
  })
}
export const putAdApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/ad/put`,
    data
  })
}

export const adDetailApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/ad/page`,
    data
  })
}

export const getTaskSubmitApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task-submit/page-submit`,
    data
  })
}

export const submitAuditApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/admin/v1/task-submit/audit`,
    data
  })
}

export const getDailyActiveApi = (data: any) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/daily-active`,
    data
  })
}

export const getFacultyCountApi = (data: any) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/faculty-count`,
    data
  })
}

export const getHotTaskApi = (data: any) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/hot-task`,
    data
  })
}

export const getTaskCountApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/task-count`
  })
}

export const getStudentRegisterApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/student-register`
  })
}

export const getUserInfoApi = (id: string) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/user/info?userId=${id}`
  })
}

export const getTaskCompletionApi = (id: string) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/task-completion?studentId=${id}`
  })
}

export const getAdListApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/ad-list`
  })
}

export const getAdClickApi = (id: string) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/ad-click?adId=${id}`
  })
}

export const getStudentRegisterMapApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/admin/v1/stats/student-register-map`
  })
}
export const getProductsApi = () => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/product/v1/products`
  })
}
/* 
返回结果格式：
{"code":"0","message":null,"data":[{"createTime":"2024-11-21T14:57:26.136+00:00","updateTime":"2024-11-21T14:57:26.136+00:00","delFlag":0,"id":1,"productName":"斑马牌（ZEBRA）0.5mm自动铅笔","productImg":"https://engroc.oss-cn-fuzhou.aliyuncs.com/Typora/202411212242362.png","productIntroduction":"斑马牌（ZEBRA）0.5mm自动铅笔 不易断芯绘图活动铅笔学生用 低重心双弹簧设计 MA85 白色笔杆","needPoints":2,"stocks":996}],"requestId":null,"success":true}

*/

export const getProductApi = (id: string) => {
  return service.request({
    method: 'get',
    url: `/api/new-sprout/product/v1/product/${id}`
  })
}
/*
返回结果格式
{
    "code": "",
    "message": "",
    "data": {
        "createTime": "",
        "updateTime": "",
        "delFlag": 0,
        "id": 0,
        "productName": "",
        "productImg": "",
        "productIntroduction": "",
        "needPoints": 0,
        "stocks": 0
    },
    "requestId": ""
}
*/

export const addProductApi = (data: any) => {
  return service.request({
    method: 'post',
    url: `/api/new-sprout/product/v1/admin/product`,
    data
  })
}

/*
请求数据格式
{
    "productName": "string",
    "productImg": "string",
    "productIntroduction": "string",
    "needPoints": 0,
    "stocks": 0
}


返回结果格式
{
    "code": "",
    "message": "",
    "data": null,
    "requestId": ""
}
*/
