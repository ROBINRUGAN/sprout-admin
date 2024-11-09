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
