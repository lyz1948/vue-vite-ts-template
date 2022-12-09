import { Pic } from '@/types/source'

export interface SourceState {
  picList: Pic[] | null
}

export const state: SourceState = {
  picList: [],
}
