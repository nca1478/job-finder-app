export const parseDataSelect = (data) => {
  return data.map((item, i) => ({
    id: item.id,
    value: i + 1,
    label: item.name,
  }))
}
