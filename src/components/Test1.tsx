import React from 'react'

const MyComponent: React.FC<any> = (props: any) => {
	const [state, setState] = React.useState<any>(null)

	return (
		<div>
			<h1>{props.title}</h1>
			<p>{state}</p>
			<button onClick={() => setState('Clicked!')}>Click me</button>
		</div>
	)
}

export default MyComponent
