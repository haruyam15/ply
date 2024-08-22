import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/global.css'
import Topbar from '@/components/topbar/Topbar'
import Nav from '@/components/nav/Nav'
import Logo from '@/components/Logo'

function App() {
	const [userName, setUserName] = useState(null)

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await axios.get('/api/users')
			const userNames = res.data.map((item: { name: string }) => item.name)
			setUserName(userNames)
		}
		fetchUserData()
	}, [])

	return (
		<>
			<div style={{ minHeight: '100vh', minWidth: '950px' }}>
				<Topbar />
				<Nav />
				<Logo />
			</div>
		</>
	)
}

export default App
