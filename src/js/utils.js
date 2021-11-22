const _conditionalReturn = (value, func) => value || value === 0 ? func(value) : func
export const mapRange = (inMin, inMax, outMin, outMax, value) => {
   let inRange = inMax - inMin,
      outRange = outMax - outMin
    return _conditionalReturn(value, value => outMin + (((value - inMin) / inRange) * outRange))
}