import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererHeader from './'

describe('BlockRendererList', () => {
  const text = 'Prinz Eugen'
  const wrapper = mount(BlockRendererHeader, {
    localVue,
    propsData: {
      data: { text, level: 1 }
    }
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should render <h1>', () => {
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  test('should render text', () => {
    expect(wrapper.find('h1').text()).toBe(text)
  })
})

describe('BlockRendererList test with all heading levels', () => {
  for (let level = 1; level <= 6; level++) {
    test(`should render h${level}`, () => {
      const wrapper = mount(BlockRendererHeader, {
        localVue,
        propsData: {
          data: { text: 'Prinz Eugen', level }
        }
      })

      expect(wrapper.find(`h${level}`).exists()).toBe(true)
    })
  }
})
