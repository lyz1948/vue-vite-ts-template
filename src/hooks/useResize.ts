import { watch } from 'vue'
import { useStore } from '@/store'
import { DeviceType } from '@/store/modules/app/state'
import { useRoute } from 'vue-router'
import { SettingActionTypes } from '../store/modules/setting/action-types'

const WIDTH = 992

export default function() {
  const store = useStore()
  const currentRoute = useRoute()

  const watchRouter = watch(() => currentRoute.name, () => {
    if (store.state.setting.device === DeviceType.Mobile && store.state.setting.visibleSidebar) {
      store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
        type: 'visibleSidebar',
        val: false,
      })
    }
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
        type: 'device',
        val: DeviceType.Mobile,
      })
      store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
        type: 'visibleSidebar',
        val: true,
      })
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
        type: 'device',
        val: isMobile() ? DeviceType.Mobile : DeviceType.Desktop,
      })

      if (isMobile()) {
        store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
          type: 'visibleSidebar',
          val: true,
        })
      }
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
