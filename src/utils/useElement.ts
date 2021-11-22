import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

export default function () {
  type msgType = '' | 'success' | 'warning' | 'info' | 'error' | undefined

  const open = (message: string, type: msgType, showClose: boolean = false) => {
    ElMessage({
      message,
      type,
      showClose
    })
  }

  const success = (message: string = '操作成功', showClose?: boolean): any => {
    open(message, 'success', showClose)
  }

  const error = (message: string = '操作失败', showClose?: boolean): any => {
    open(message, 'error', showClose)
  }

  const warning = (message: string = '这是一条警告消息', showClose?: boolean): any => {
    open(message, 'warning', showClose)
  }

  const info = (message: string = '这是一条提示消息', showClose?: boolean): any => {
    open(message, 'info', showClose)
  }

  const confirm = (
    message: string = 'proxy will permanently delete the file. Continue?',
    title: string = 'Warning'
  ) => {
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(resolve)
        .catch(() => {
          console.log('cancel')
          reject()
        })
    })
  }

  const loading = (text: string = 'Loading') => {
    return ElLoading.service({
      lock: true,
      text,
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  return {
    success,
    error,
    warning,
    info,
    confirm,
    loading
  }
}
