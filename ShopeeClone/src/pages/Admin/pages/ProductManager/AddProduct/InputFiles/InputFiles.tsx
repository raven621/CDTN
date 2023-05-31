import { forwardRef, Fragment, InputHTMLAttributes, useRef } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameError?: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isMultiple?: boolean
}

const InputFiles = forwardRef<HTMLInputElement, Props>(function InputFilesInner({
  errorMessage,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  onChange,
  onFileChange,
  isMultiple = false
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    onFileChange(event)
  }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpeg,.jpg,.png'
        ref={fileInputRef}
        onChange={handleChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
        multiple={isMultiple}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
      <div className={classNameError}>{errorMessage}</div>
    </Fragment>
  )
})

export default InputFiles
