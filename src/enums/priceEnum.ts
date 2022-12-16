// 价格类型 传大写，不传为全部， cost-成本，colleague=同行，direct=直客,可用值:COST,COLLEAGUE,DIRECT,CUSTOMER

export enum PriceEnum {
  /** 成本 */
  COST = 'COST',
  /** 同行 */
  COLLEAGUE = 'COLLEAGUE',
  /** 直客 */
  DIRECT = 'DIRECT',
  /** 客户 */
  CUSTOMER = 'CUSTOMER',
}

export enum PriceLabelEnum {
  /** 成本 */
  COST = '成本',
  /** 同行 */
  COLLEAGUE = '同行',
  /** 直客 */
  DIRECT = '直客',
  /** 客户 */
  CUSTOMER = '客户',
}