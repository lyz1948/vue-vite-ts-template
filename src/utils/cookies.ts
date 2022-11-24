import Keys from '@/constants/keyConstant'
import Cookies from 'js-cookie'

export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = () => Cookies.get(Keys.languageKey)
export const setLanguage = (language: string) =>
  Cookies.set(Keys.languageKey, language)

export const getSize = () => Cookies.get(Keys.sizeKey)
export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)


export const getUserInfo = () => {
  const info = Cookies.get(Keys.userInfoKey)
  let userInfo: any
  if (info?.startsWith('{')) {
    try {
      userInfo = JSON.parse(info)
    } catch(err) {
      console.error(err)
    }
  }
  return userInfo
}
export const setUserInfo = (data: any) => Cookies.set(Keys.userInfoKey, data)
export const removeUserInfo = () => Cookies.remove(Keys.userInfoKey)
