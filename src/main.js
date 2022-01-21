import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@tabler/core' 
import VueApexCharts from "vue3-apexcharts";


createApp(App).use(router).use(VueApexCharts).mount('#app')
