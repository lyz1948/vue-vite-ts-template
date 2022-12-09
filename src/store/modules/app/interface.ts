export interface Refund {
  advanceDay: number
  rate: number
}

export interface ActiveValid {
  /** 商城砍价时效 */
  mallHaggleTime: number
  /** 商城拼团时效 */
	mallInGroupTime: number
}

export interface PhoneItem {
  code?: string
  id?: number
  isEnable?: boolean
  mobilePhone?: string
  name?: string
  telphone?: string
}

export interface MessageTpl {
  name: string
  code: string
  type: string
  content?: string
  id?: number,
  isEnable?: boolean,
  templateCode?: string
}