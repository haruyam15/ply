/** @jsxImportSource @emotion/react */
import React from 'react'
import { colors } from '@/styles/colors'
import SignModal from '@/components/sign/SignModal'
import useSignModalStore from '@/store/useSignModalStore'
import {
	submitBtn,
	idAndPasswordArea,
	idAndPassword,
	modalMovementBtn,
} from '@/components/sign/Signin'

const Signup: React.FC = () => {
	const signinModal = useSignModalStore((state) => state.signModals)
	const closeSigninModal = useSignModalStore((state) => state.closeModal)
	const openSigninModal = useSignModalStore((state) => state.openModal)

	const jsx: React.ReactNode = (
		<>
			<h2 css={{ marginTop: '40px' }}>Sign Up</h2>
			<form css={{ width: '330px' }}>
				<div css={idAndPasswordArea}>
					<input css={idAndPassword} type="text" required />
					<label>Name</label>
				</div>
				<div css={idAndPasswordArea}>
					<input css={idAndPassword} type="text" required />
					<label>ID</label>
				</div>
				<div css={idAndPasswordArea}>
					<input css={idAndPassword} type="password" required />
					<label>Password</label>
				</div>
				<div css={{ fontSize: '14px' }}>
					<label
						css={{ cursor: 'pointer', accentColor: `${colors.primaryGreen}` }}
						htmlFor="remember"
					>
						<input css={{ cursor: 'pointer' }} type="checkBox" id="remember" />
						All confirmed
					</label>
				</div>
				<button css={submitBtn} type="submit" onClick={() => closeSigninModal('signup')}>
					Sign Up
				</button>
			</form>
			<p css={{ fontSize: '14px', marginBottom: '40px' }}>
				Want to sign in?
				<button css={modalMovementBtn} onClick={() => openSigninModal('signin')}>
					Go back to login
				</button>
			</p>
		</>
	)
	return (
		<>
			{signinModal.modalName === 'signup' && signinModal.modalState ? (
				<SignModal jsx={jsx} modalName="signup" />
			) : null}
		</>
	)
}

export default Signup
