import PhoneInputPackage from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInput = ({ onChange, value, className, label }) => {
  return (
    <div>
      {label ? <div style={{marginBottom: '8px'}}>{label}</div> : null}
      <PhoneInputPackage
        country={'uz'}
        countryCodeEditable={false}
        disableDropdown
        inputClass={`!w-100 ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default PhoneInput
