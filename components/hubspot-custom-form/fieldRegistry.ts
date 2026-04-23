import type { ComponentType } from 'react'
import type { FieldRendererProps } from './types'
import TextField from './fields/TextField'
import TextAreaField from './fields/TextAreaField'
import DropdownField from './fields/DropdownField'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'
import MultipleCheckboxesField from './fields/MultipleCheckboxesField'
import DateField from './fields/DateField'
import FileField from './fields/FileField'

const fieldRegistry: Record<string, ComponentType<FieldRendererProps>> = {
  single_line_text: TextField,
  email: TextField,
  phone: TextField,
  number: TextField,
  multi_line_text: TextAreaField,
  dropdown: DropdownField,
  radio: RadioField,
  checkbox: CheckboxField,
  booleancheckbox: CheckboxField,
  multiple_checkboxes: MultipleCheckboxesField,
  date: DateField,
  file: FileField,
}

export function getFieldRenderer(fieldType: string): ComponentType<FieldRendererProps> {
  return fieldRegistry[fieldType] ?? TextField
}
