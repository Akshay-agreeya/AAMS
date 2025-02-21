export const WCAGVersionSelect = ({ className = "form-select", value, onChange, ...rest }) => {
    return (
      <select className={className} value={value} onChange={onChange} {...rest}>
        <option value="">Select WCAG Version</option>
        <option value="WCAG 2.0">WCAG 2.0</option>
        <option value="WCAG 2.1">WCAG 2.1</option>
        <option value="WCAG 2.2">WCAG 2.2</option>
      </select>
    );
  };