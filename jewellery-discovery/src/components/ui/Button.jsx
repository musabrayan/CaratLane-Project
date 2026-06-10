export const Button = ({ children, className = '', variant = 'primary', type = 'button', ...props }) => {
  const variantClass = variant === 'ghost' ? 'button button-ghost' : variant === 'secondary' ? 'button button-secondary' : 'button button-primary'

  return (
    <button type={type} className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button