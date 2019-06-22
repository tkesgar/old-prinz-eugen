import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import IndexComponent from '.'

describe('MainFooter', () => {
  const wrapper = mount(IndexComponent, { localVue })

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
