import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererParagraph from './'

describe('BlockRendererParagraph', () => {
  test('should match snapshot', () => {
    const wrapper = mount(BlockRendererParagraph, {
      localVue,
      propsData: {
        data: {
          text: '*Yawns* ... Battleships? Nothing but small fry.'
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('should render html', () => {
    const wrapper = mount(BlockRendererParagraph, {
      localVue,
      propsData: {
        data: {
          text: '<i>Yawns</i> ... <b>Battleships<b>? Nothing but <u>small fry</u>.'
        }
      }
    })

    expect(wrapper.find('i').exists()).toBe(true)
    expect(wrapper.find('b').exists()).toBe(true)
    expect(wrapper.find('u').exists()).toBe(true)
  })
})
