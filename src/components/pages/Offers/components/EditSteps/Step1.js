// Dependencies
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// Custom Dependencies
import { get } from '../../../../../config/api'
import { InputForm } from '../InputForm'
import { SelectFormEdit } from '../SelectFormEdit'
import { parseData } from '../../helpers/parseData'
import { sortListObjects } from '../../../../../helpers/utils'
import { TextareaForm } from '../TextareaForm'

export const Step1 = ({
  page,
  handlePrev,
  handleNext,
  formValuesEdit,
  setFormValuesEdit,
}) => {
  const [sectorOptions, setSectorOptions] = useState(null)
  const { offerId } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm()

  const fetchSectors = useCallback(async () => {
    await get('/sectors?page=1&limit=1000')
      .then(({ data }) => {
        const sectors = parseData(data.rows)
        sortListObjects(sectors)
        setSectorOptions(sectors)
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
  }, [])

  useEffect(() => {
    fetchSectors()
    reset(formValuesEdit)
  }, [offerId, fetchSectors, reset, formValuesEdit])

  const onSubmit = (data) => {
    if (data) {
      setFormValuesEdit({ ...formValuesEdit, ...data })
      handleNext()
    }
  }
  return (
    <>
      <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          type="text"
          name="title"
          label="Title"
          placeholder="Enter Title"
          controlId="formBasicTitle"
          register={register}
          errors={errors.title}
        />

        <TextareaForm
          name="description"
          label="Description"
          placeholder="Enter Description"
          controlId="formBasicDescription"
          register={register}
          errors={errors.description}
        />

        <SelectFormEdit
          name="sectors"
          label="Sectors"
          controlId="formBasicSectors"
          control={control}
          options={sectorOptions}
          errors={errors.sectors}
          isMulti={true}
        />

        <div className="d-flex justify-content-between gap-1">
          <Button
            type="button"
            variant="primary"
            className="px-4"
            disabled={page === 0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Button type="submit" variant="primary" className="px-4">
            Next
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  )
}
