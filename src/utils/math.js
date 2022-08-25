export const scaleNumber = (number, min, max, toMin, toMax) => {
  return ((number - min) / (max - min)) * (toMax - toMin) + toMin || 0
}
