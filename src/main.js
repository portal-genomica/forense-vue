import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@tabler/core' 
import 'bootstrap'
import VueApexCharts from "vue3-apexcharts"
import "@tabler/core/dist/css/tabler.min.css"
import "@tabler/core/dist/js/tabler.min.js"


createApp(App).use(router)
              .use(VueApexCharts)
              .mount('#app')
