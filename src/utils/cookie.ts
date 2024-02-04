import Cookies from 'js-cookie'

export interface UserInfo {
  userId: string
  account: string
  name: string
  roleName: string
}

export enum CookieKey {
  token = 'token',
  userInfo = 'userInfo',
}

export function setToken(token: string) {
  return Cookies.set(CookieKey.token, token)
}

export function getToken() {
  return Cookies.get(CookieKey.token)
}

export function checkHaveToken() {
  return !!getToken()
}

export function removeToken() {
  return Cookies.remove(CookieKey.token)
}

export function setUserInfo(userInfo: UserInfo) {
  return Cookies.set(CookieKey.userInfo, JSON.stringify(userInfo))
}

export function getUserInfo() {
  return JSON.parse(Cookies.get(CookieKey.userInfo) || '{}') as UserInfo
}

export function removeUserInfo() {
  return Cookies.remove(CookieKey.userInfo)
}
