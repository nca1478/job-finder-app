// API Config
import { get } from '../../../../config/api'

// Helpers
import { sortListObjects } from '../../../../helpers/utils'

export const getSectors = async (user, setSectorOptions) => {
  await get('/sectors', user.data.token).then(({ data }) => {
    const sectors = data.map((sector, i) => ({
      value: i + 1,
      label: sector.name,
      id: sector.id,
    }))
    sortListObjects(sectors)
    setSectorOptions(sectors)
  })
}
