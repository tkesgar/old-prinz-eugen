import { shallowMount } from '@vue/test-utils'
import MeCharaList from './'

describe('MeCharaList', () => {
  const wrapper = shallowMount(MeCharaList)

  test('should mount successfully', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
