export const Select = ({ className = "form-select", options, onChange, children, multiple, ...rest }) => {

	return (
		<select className={className} onChange={onChange} multiple={multiple} {...rest}>
			{options ? options.map((item, index) => <option value={item.value} {...item.props} key={index}>{item.label}</option>) : children}
		</select>
	)
}