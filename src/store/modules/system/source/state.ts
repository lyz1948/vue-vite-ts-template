import { Pic, PicType } from '@/types/source'

export interface SourceState {
  picTypeList: PicType[] | null
  picList: Pic[] | null
  picByTypeList: object
}

export const state: SourceState = {
  picTypeList: null,
  picList: null,
  picByTypeList: {},
}
