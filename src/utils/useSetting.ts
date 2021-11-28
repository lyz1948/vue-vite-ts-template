import { computed } from 'vue'
import { useStore } from '@/store/index'
import { DeviceType } from '@/store/modules/setting/state'
import { MenuModeEnum } from '../config/setting';

export default function () {
  const store = useStore()

  const device = computed(() => {
    return store.state.setting.device
  })

  const isMobile = computed(() => {
    return device.value == DeviceType.Mobile
  })

  const isHorizonal = computed(() => {
    return store.state.setting.menuMode === MenuModeEnum.HORIZONTAL
  })

  const isOpen = computed(() => {
    return store.state.setting.visibleSidebar
  })

  return {
    device,
    isOpen,
    isMobile,
    isHorizonal,
  }
}
