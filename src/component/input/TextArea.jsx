export const RequirementTextarea = ({ className = "form-control", value, onChange, placeholder, ...rest }) => {
    return (
      <textarea className={className} value={value} onChange={onChange} placeholder={placeholder} rows="3" {...rest} />
    );
  };