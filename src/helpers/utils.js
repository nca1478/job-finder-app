export const sortListObjects = (listObjects) => {
  listObjects.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
    return 0
  })
}

export const sortListByLabel = (listObjects) => {
  listObjects.sort((a, b) => {
    if (a.label > b.label) {
      return 1
    }
    if (a.label < b.label) {
      return -1
    }
    return 0
  })
}
