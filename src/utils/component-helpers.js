export const helperMethods = {
  showModal (name) {
    this.$bvModal.show(name)
  },
  hideModal (name) {
    return this.$bvModal.hide(name)
  }
}
