import { mount } from '@vue/test-utils'
import localVue from '../../utils/test/local-vue'
import MainMeCharaListView from './view'

describe('MainMeCharaListView', () => {
  describe('with empty chara list (default)', () => {
    const wrapper = mount(MainMeCharaListView, { localVue })

    test('should mount successfully', () => {
      expect(wrapper.isVueInstance()).toBe(true)
    })

    test('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot()
    })

    test('should show empty message', () => {
      expect(wrapper.find('[data-test-key="empty-message"]').exists()).toBe(true)
    })
  })

  describe('with chara list', () => {
    const charas = [
      { id: 1, name: 'admiral_hipper' },
      { id: 2, name: 'blucher' },
      { id: 3, name: 'prinz_eugen' },
      { id: 4, name: 'seydlitz' },
      { id: 5, name: 'lutzow' }
    ]

    const wrapper = mount(MainMeCharaListView, {
      localVue,
      propsData: { charas }
    })

    test('should mount successfully', () => {
      expect(wrapper.isVueInstance()).toBe(true)
    })

    test('should match snapshot', () => {
      expect(wrapper.element).toMatchSnapshot()
    })

    test('should shows the correct amount of chara entry', () => {
      expect(wrapper.findAll('[data-test-key="chara"]').length).toBe(charas.length)
    })
  })
})
