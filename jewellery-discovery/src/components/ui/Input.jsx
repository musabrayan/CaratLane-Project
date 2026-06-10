export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <label className={`field ${className}`.trim()}>
      {label ? <span className="field-label">{label}</span> : null}
      <input className={`field-input ${error ? 'field-input-error' : ''}`.trim()} {...props} />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  )
}

export default Input