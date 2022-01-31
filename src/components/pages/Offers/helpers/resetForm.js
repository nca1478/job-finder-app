export const resetForm = (reset, setValue) => {
  reset()
  setValue('sectors', null)
  setValue('skills', null)
  setValue('currency', null)
  setValue('country', null)
  setValue('state', null)
  setValue('city', null)
}
