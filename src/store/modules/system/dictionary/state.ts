import { DictionaryTypeAndSub } from '@/types/system'

export interface DictionaryState {
  dictionaryData: any[]
  dictionaryTypeData: any[]
  dictionaryAllData: { [keys: string]: DictionaryTypeAndSub } | null
}

export const state: DictionaryState = {
  dictionaryData: [],
  dictionaryTypeData: [],
  dictionaryAllData: null,
}
