import { createApp } from 'vue'
import { ElButton, ElForm, ElFormItem, ElTable } from 'element-plus';

export const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElTable,
]

export default (app: ReturnType<typeof createApp>) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
