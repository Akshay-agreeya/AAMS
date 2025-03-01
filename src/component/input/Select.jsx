export const Select = ({className="form-select", options, children, ...rest }) => {

	return (
		<select className={className} {...rest}>
			{options ? options.map((item,index) => <option value={item.value} {...item.props} key={index}>{item.label}</option>) : children}
		</select>
	)
}