import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import CreateCharaModalForm from './form'

describe('CreateCharaModalForm', () => {
  const wrapper = mount(CreateCharaModalForm, { localVue })

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
