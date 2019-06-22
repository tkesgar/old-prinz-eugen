import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import ViewComponent from './view'

describe('CardRegister', () => {
  const wrapper = mount(ViewComponent, { localVue })

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
