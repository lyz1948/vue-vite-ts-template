import { DictionaryTypeItem, DictionaryTypeAndSub } from '@/types/system'

export interface DictionaryState {
  dictionaryData: DictionaryTypeItem[] | []
  dictionaryTypeData: DictionaryTypeItem[] | []
  dictionaryAllData: { [keys: string]: DictionaryTypeAndSub } | null
}

export const state: DictionaryState = {
  dictionaryData: [],
  dictionaryTypeData: [],
  dictionaryAllData: null,
}
