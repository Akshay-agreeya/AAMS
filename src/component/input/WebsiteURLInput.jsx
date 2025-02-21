export const WebsiteAccessibilityInput = ({ className = "form-control", value, onChange, placeholder, ...rest }) => {
    return (
      <input type="text" className={className} value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    );
  };