import { FC, useCallback, useRef } from 'react'
import classNames from './index.module.scss'
import { TaskForm } from '../../../types'
import { Typography, Button, TextField, useMediaQuery } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { emptyCallback } from '../../../utilities'

export interface FormProps {
  onAdd: (newTaskText: string) => void
}

const Form: FC<FormProps> = ({ onAdd }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const matches = useMediaQuery('(max-width:768px)')

  const {
    values,
    isValid,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleBlur
  } = useFormik<TaskForm>({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().min(1).required()
    }),
    onSubmit: emptyCallback
  })

  const { text: textValue } = values

  const handleAddTaskClick = useCallback(() => {
    if (!isValid) {
      return
    }
    onAdd(textValue)
    inputRef.current?.focus()
    setFieldTouched('text', false)
    setFieldValue('text', '')
  }, [isValid, textValue, setFieldTouched, setFieldValue, onAdd])

  return (
    <form className={classNames.form}>
      <div className={`${classNames.form__item} ${classNames.form__item_input}`}>
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Task..."
          variant="standard"
          name="text"
          value={textValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Typography component="p" color="#FF3333">
          {touched.text && errors.text}&nbsp;
        </Typography>
      </div>
      <div className={`${classNames.form__item} ${classNames.form__item_button}`}>
        <Button
          fullWidth={matches}
          variant="contained"
          onClick={handleAddTaskClick}
          disabled={!isValid}
        >
          <Typography>Add</Typography>
        </Button>
      </div>
    </form>
  )
}

export default Form
