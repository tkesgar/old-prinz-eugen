import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import BlockRendererList from './'

describe('BlockRendererList', () => {
  const style = 'ordered'
  const items = [
    'If you overwork yourself too much... you ~ will ~ die.',
    'Lucky ship? Are you mocking me?',
    'Operation Rheinübung? Looking back, that was how it all began for me.'
  ]

  const wrapper = mount(BlockRendererList, {
    localVue,
    propsData: {
      data: { style, items }
    }
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should render matching number of items', () => {
    expect(wrapper.findAll('li').length).toBe(items.length)
  })

  test('should render <ol>', () => {
    expect(wrapper.find('ol').exists()).toBe(true)
  })
})

describe('BlockRendererList with style = unordered', () => {
  const style = 'unordered'
  const items = [
    'If you overwork yourself too much... you ~ will ~ die.',
    'Lucky ship? Are you mocking me?',
    'Operation Rheinübung? Looking back, that was how it all began for me.'
  ]

  const wrapper = mount(BlockRendererList, {
    localVue,
    propsData: {
      data: { style, items }
    }
  })

  test('should render <ul>', () => {
    expect(wrapper.find('ul').exists()).toBe(true)
  })
})

describe('BlockRendererList with empty items', () => {
  const style = 'unordered'
  const items = [
    'If you overwork yourself too much... you ~ will ~ die.',
    'Lucky ship? Are you mocking me?',
    'Operation Rheinübung? Looking back, that was how it all began for me.'
  ]

  const wrapper = mount(BlockRendererList, {
    localVue,
    propsData: {
      data: { style, items }
    }
  })

  test('should render <ul>', () => {
    expect(wrapper.find('ul').exists()).toBe(true)
  })
})
