export const uploadBase = import.meta.env.VITE_APP_BASE_API + '/upload'
export const uploadUrl = uploadBase + '/up-mall-pic-list'
export const deleteFileUrl = uploadBase + '/del-mall-pic'

export const picPrefix = 'aliyuncs.com/'

// 获取OSS地址的名字
export const getUploadFileName = (path) => {
  const [, suffic] = path.split(picPrefix)
  const [name] = suffic.split('?')

  return name
}