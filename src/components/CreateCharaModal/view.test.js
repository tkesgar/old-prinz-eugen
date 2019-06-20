import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import CreateCharaModal from './view'

describe('CreateCharaModal', () => {
  const wrapper = mount(CreateCharaModal, {localVue})

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
