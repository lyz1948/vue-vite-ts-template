import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

type Tips = {
  message?: string
  showClose?: boolean
}

type Confirm = {
  message?: string
  title?: string
}

type msgType = 'success' | 'warning' | 'info' | 'error'

type Toast = {
  message: string
  type: msgType
  showClose?: boolean
}

export default function () {
  const showToast = ({ message, type, showClose }: Toast) => {
    ElMessage({
      message,
      type,
      showClose,
    })
  }

  const success = ({ message = '操作成功', showClose = true }: Tips): any => {
    showToast({ message, type: 'success', showClose })
  }

  const error = ({ message = '操作失败', showClose = true }: Tips): any => {
    showToast({ message, type: 'error', showClose })
  }

  const warning = ({ message = '这是一条警告信息', showClose = true }: Tips): any => {
    showToast({ message, type: 'warning', showClose })
  }

  const info = ({ message = '这是一条提示消息', showClose = true }: Tips): any => {
    showToast({ message, type: 'info', showClose })
  }

  const confirm = ({ message = 'proxy will permanently delete the file. Continue?', title = 'Warning' }: Confirm) => {
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(resolve)
        .catch(() => {
          reject()
        })
    })
  }

  const loading = (text: 'Loading') => {
    return ElLoading.service({
      lock: true,
      text,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  return {
    showToast,
    success,
    error,
    warning,
    info,
    confirm,
    loading,
  }
}
