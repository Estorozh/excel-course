import './scss/style.scss'
import {Dashboard} from './pages/dashboard'
import {Router} from '@core/routes/Router'
import {ExcelPage} from './pages/ExcelPage'


new Router('#app', {
  dashboard: Dashboard,
  excel: ExcelPage
})