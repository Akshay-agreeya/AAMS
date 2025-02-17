
export const Input = ({ className = "form-control", type = "text", placeholder, ...rest }) => {

   return (

      <input type={type} className={className} placeholder={placeholder} {...rest} />
   )
}