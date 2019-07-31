import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererDelimiter from './'

describe('BlockRendererDelimiter', () => {
  const wrapper = mount(BlockRendererDelimiter, { localVue })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
