export function showModal (wrapper, id = wrapper.vm.$el.id) {
  wrapper.vm.$bvModal.show(id)
}
