import { createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()

localVue.use(BootstrapVue)

export default localVue
