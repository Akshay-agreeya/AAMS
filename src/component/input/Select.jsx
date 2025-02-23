export const Select = ({ options, children, ...rest }) => {

	return (
		<select className="form-select" {...rest}>
			{options ? options.map((item,index) => <option value={item.value} {...item.props} key={index}>{item.label}</option>) : children}
		</select>

	)


}