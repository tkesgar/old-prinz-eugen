import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import MeCharaListView from './view'

describe('MeCharaListView', () => {
  const wrapper = mount(MeCharaListView, {localVue})

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('MeCharaListView with empty list (default)', () => {
  const wrapper = mount(MeCharaListView, {localVue})

  test('should show empty message', () => {
    expect(wrapper.find('.chara-list-empty').exists()).toBe(true)
  })
})
