export const Select = ({ options, children, ...rest }) => {

	return (
		<select class="form-select" {...rest}>
			{options ? options.map(item => <option value={item.value}>{item.label}</option>) : children}
		</select>

	)


}