export interface FieldValidation {
  field: string
  validate (value: string): Error
  test? (value: string): string
}
