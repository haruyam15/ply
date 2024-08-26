import React, { ReactNode, ReactElement, Children, isValidElement } from 'react'

const Then: React.FC<ThenProps> = ({ children }) => <>{children}</>
const Else: React.FC<ElseProps> = ({ children }) => <>{children}</>

const If: React.FC<IfProps> & {
	Then: React.FC<ThenProps>
	Else: React.FC<ElseProps>
} = ({ test, children }) => {
	let thenNode: ReactElement | null = null
	let elseNode: ReactElement | null = null

	Children.forEach(children, (child) => {
		if (isValidElement(child)) {
			if (child.type === If.Then) {
				thenNode = child
			} else if (child.type === If.Else) {
				elseNode = child
			}
		}
	})

	return test ? thenNode : elseNode
}

If.Then = Then
If.Else = Else

export { If }

interface ThenProps {
	children: ReactNode
}

interface ElseProps {
	children: ReactNode
}

interface IfProps {
	test: boolean
	children: ReactNode
}
