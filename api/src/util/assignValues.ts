export function assignValues(
  model: any,
  values: any,
  keys: string[] = Object.keys(values),
) {
  for (const key of keys) {
    if (values.hasOwnProperty(key)) {
      model[key] = values[key];
    }
  }
}
