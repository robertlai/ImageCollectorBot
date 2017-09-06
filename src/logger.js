const SEPARATOR_LENGTH = 75

const logger = {
  log(text) {
    console.log(`> ${text}`)
  },
  error(err) {
    this.block([`Error: ${err.message || err}`])
  },
  block(arr) {
    this.separator()
    arr.forEach(text => {
      console.log(text)
    })
    this.separator()
  },
  separator() {
    console.log(Array(SEPARATOR_LENGTH + 1).join('='))
  }
}

export default logger
