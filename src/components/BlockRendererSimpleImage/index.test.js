import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererSimpleImage from './'

const url = 'https://azurlane.yo-star.com/static/bz7.bd94444.png'
const caption = 'HMS Illustrious'

describe('BlockRendererDelimiter', () => {
  const wrapper = mount(BlockRendererSimpleImage, {
    localVue,
    propsData: {
      data: {
        url,
        caption,
        withBorder: true,
        withBackground: true,
        stretched: true
      }
    }
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should render <img> with src = url', () => {
    expect(wrapper.find('img').attributes('src')).toBe(url)
  })

  test('should render caption', () => {
    expect(wrapper.find('figcaption').text()).toBe(caption)
  })

  test('should render alt', () => {
    expect(wrapper.find('img').attributes('alt')).toBe(caption)
  })

  test('should add border class', () => {
    expect(wrapper.find('.border-secondary').exists()).toBe(true)
  })

  test('should add background class', () => {
    expect(wrapper.find('.bg-light').exists()).toBe(true)
  })

  test('should add stretched class', () => {
    expect(wrapper.find('.figure-stretched').exists()).toBe(true)
  })
})

describe('BlockRendererDelimiter with no boolean data provided', () => {
  const wrapper = mount(BlockRendererSimpleImage, {
    localVue,
    propsData: {
      data: { url, caption }
    }
  })

  test('should not add border class', () => {
    expect(wrapper.find('.border-secondary').exists()).toBe(false)
  })

  test('should not add background class', () => {
    expect(wrapper.find('.bg-light').exists()).toBe(false)
  })

  test('should not add stretched class', () => {
    expect(wrapper.find('.figure-stretched').exists()).toBe(false)
  })
})

describe('BlockRendererDelimiter with empty caption', () => {
  const wrapper = mount(BlockRendererSimpleImage, {
    localVue,
    propsData: {
      data: { url, caption: '' }
    }
  })

  test('should not render caption', () => {
    expect(wrapper.find('figcaption').exists()).toBe(false)
  })

  test('should not add alt attribute', () => {
    expect(wrapper.find('img').attributes('alt')).toBeUndefined()
  })
})
