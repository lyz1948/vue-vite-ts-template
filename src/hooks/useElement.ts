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

  const success = ({ message = '操作成功', showClose = true }: Tips = {}): any => {
    showToast({ message, type: 'success', showClose })
  }

  const error = ({ message = '操作失败', showClose = true }: Tips = {}): any => {
    showToast({ message, type: 'error', showClose })
  }

  const warning = ({ message = '这是一条警告信息', showClose = true }: Tips = {}): any => {
    showToast({ message, type: 'warning', showClose })
  }

  const info = ({ message = '这是一条提示消息', showClose = true }: Tips = {}): any => {
    showToast({ message, type: 'info', showClose })
  }

  const confirm = (message = '删除后将无法恢复，确定操作吗?', title = '警告') => {
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(resolve)
      .catch(reject)
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
