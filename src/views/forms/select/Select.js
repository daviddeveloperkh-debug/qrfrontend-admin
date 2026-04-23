import React, { useState } from 'react'
import ReactSelectComponent from 'react-select'
import { IMAGES } from '../../../assets/images'

const Select = ({ className, placeholder, loading, isValid, value, size, label, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-100">
      {label ? <div style={{ marginBottom: '8px' }}>{label}</div> : null}
      <ReactSelectComponent
        {...props}
        className={`w-100 ${className} ${size === 'sm' && 'react-select-sm'}`}
        classNames={{
          control: () => `select-control ${isOpen ? 'open' : ''}`,
          indicatorsContainer: () => `indicator-container`,
          singleValue: () => `singleValue`,
          menu: () => `select-menu`,
          option: () => `select-option`,
        }}
        isLoading={loading}
        isDisabled={loading}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        isClearable
        aria-invalid={!value ? 'true' : 'false'}
        value={value}
        hideSelectedOptions
        styles={{
          menu: (styles) => ({
            ...styles,
            zIndex: 100,
            width: 'auto',
            minWidth: '100%',
          }),
          indicatorsContainer: (styles) => ({
            padding: size === 'sm' && '4px',
          }),
          // control: (styles) => ({
          //   ...styles,
          //   borderColor: isValid ? '#1b9e3e' : '#e55353',
          // }),
        }}
        placeholder={placeholder ?? ''}
        noOptionsMessage={() => (
          <>
            <img src={IMAGES.noImage} width={120} height={120} alt="" />
            Ничего не найдено
          </>
        )}
      />
    </div>
  )
}

export default Select
