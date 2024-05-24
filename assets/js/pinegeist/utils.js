export const noop = () => {}

export const markRaw = (value) => {
  if (Object.isExtensible(value)) {
    Object.defineProperty(value, "__v_skip", { configurable: true, enumerable: false, value: true })
  }
  return value
}
