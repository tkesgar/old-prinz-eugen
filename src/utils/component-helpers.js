export const helperMethods = {
  showModal (name) {
    this.$bvModal.show(`${name}_modal`)
  },
  hideModal (name) {
    return this.$bvModal.hide(`${name}_modal`)
  }
}
