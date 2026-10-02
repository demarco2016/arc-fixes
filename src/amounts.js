// Compare decimal strings exactly. Never compare money lexicographically or as floats.
export function compareAmounts(left, right) {
  const parse = (value) => {
    if (typeof value !== "string" || !/^\d+(?:\.\d+)?$/.test(value)) {
      throw new TypeError("Amounts must be non-negative decimal strings")
    }
    const [whole, fraction = ""] = value.split(".")
    return { digits: BigInt(whole + fraction), scale: fraction.length }
  }
  const a = parse(left)
  const b = parse(right)
  const scale = Math.max(a.scale, b.scale)
  const aValue = a.digits * 10n ** BigInt(scale - a.scale)
  const bValue = b.digits * 10n ** BigInt(scale - b.scale)
  return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
}
