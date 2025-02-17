
export const InputPassword = ({ className = "form-control", placeholder, ...rest }) => {

    return (

        <input type="password" className={className} placeholder={placeholder} {...rest} />
    )
}