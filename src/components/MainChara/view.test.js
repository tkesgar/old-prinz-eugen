import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import ViewComponent from './view'

describe('ViewChara', () => {
  const wrapper = mount(ViewComponent, {
    localVue,
    propsData: {
      chara: {
        id: 1,
        name: 'test',
        bio: 'Test bio'
      }
    }
  })

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
