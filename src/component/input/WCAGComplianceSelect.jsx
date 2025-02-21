export const WCAGComplianceLevelSelect = ({ className = "form-select", value, onChange, ...rest }) => {
    return (
      <select className={className} value={value} onChange={onChange} {...rest}>
        <option value="">Select Compliance Level</option>
        <option value="A">A</option>
        <option value="AA">AA</option>
        <option value="AAA">AAA</option>
      </select>
    );
  };