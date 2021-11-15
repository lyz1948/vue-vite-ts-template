import { ElMessage } from 'element-plus'

type msgType = '' | 'success' | 'warning' | 'info' | 'error' | undefined

const open = (message: string, type: msgType) => {
  ElMessage({
    message,
    type,
  })
}

const success = (message: string = '操作成功'): any => {
  open(message, 'success')
}

const error = (message: string = '操作失败'): any => {
  open(message, 'error')
}

const warning = (message: string = '这是一条警告消息'): any => {
  open(message, 'warning')
}

const info = (message: string = '这是一条提示消息'): any => {
  open(message, 'info')
}

const Tips = {
  success,
  error,
  warning,
  info,
}

export default Tips

// export default function() {

//   const open = (message: string, type: msgType) => {
//     ElMessage({
//       message,
//       type,
//     })
//   }

//   const success = (message: string = "操作成功"): any => {
//     open(message, 'success')
//   }

//   const error = (message: string = "操作失败"): any => {
//     open(message, 'error')
//   }

//   const warning = (message: string = "这是一条警告消息"): any => {
//     open(message, 'warning')
//   }

//   const info = (message: string = "这是一条提示消息"): any => {
//     open(message, 'info')
//   }

//   return {
//     success,
//     error,
//     warning,
//     info
//   }
// }
