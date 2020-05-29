const helper = {
  normalizeString: (string) => {
    let res = string.replace(/\s/g, '-')
    res = res.toLowerCase()
    return res
  },
}
export default helper
