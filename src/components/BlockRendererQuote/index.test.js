import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererQuote from './'

describe('BlockRendererQuote', () => {
  const text = 'Hmm... so you\'re the Commander? How long can you keep me amused? I\'m looking forward to it.'
  const caption = 'Prinz Eugen'
  const alignment = 'left'

  const wrapper = mount(BlockRendererQuote, {
    localVue,
    propsData: {
      data: { text, caption, alignment }
    }
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should render text', () => {
    expect(wrapper.find('blockquote p').text()).toEqual(text)
  })

  test('should render caption', () => {
    expect(wrapper.find('blockquote footer').text()).toEqual(caption)
  })

  test('should add alignment class', () => {
    expect(wrapper.find(`.text-${alignment}`).exists()).toBe(true)
  })
})

describe('BlockRendererQuote with empty caption', () => {
  const text = 'Hmm... so you\'re the Commander? How long can you keep me amused? I\'m looking forward to it.'
  const caption = ''
  const alignment = 'left'

  const wrapper = mount(BlockRendererQuote, {
    localVue,
    propsData: {
      data: { text, caption, alignment }
    }
  })

  test('should not render caption', () => {
    expect(wrapper.find('blockquote footer').exists()).toBe(false)
  })
})
