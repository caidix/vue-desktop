import { createApp } from 'vue'
import importUiFramework from '@/plugins/import-ui-framework'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import '@/design/index.less'
import 'moment/dist/locale/zh-cn'
const app = createApp(App)
importUiFramework(app).use(router).use(store, key).mount('#app')
