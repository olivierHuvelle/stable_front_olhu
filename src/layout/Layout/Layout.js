import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Container, Row, Col} from 'react-bootstrap'
import {Navtopbar} from '../Components/Navtopbar/Navtopbar'
import {NavSideBarDesktop} from '../Components/Sidebar/Navsidebardesktop/Navsidebardesktop'
import {NavSideBarMobile} from '../Components/Sidebar/Navsidebarmobile/Navsidebarmobile'
import {Navigation} from '../navigation'
import classes from './Layout.module.css'

export const Layout = () => {
	const role = useSelector(state => state.role.role)
	const [navigation] = useState(new Navigation(role))
	let Component = navigation.activeComponent


	// eslint-disable-next-line no-unused-vars
	const [_, setUnusedState] = useState(0)
	const navRefreshHandler = () => {
		setUnusedState(prevState => prevState + 1)

		Component = navigation.activeComponent
	}

	const [isMobileSideBarVisible, setIsMobileSideBarVisible] = useState(false)
	const showMobileSideBarHandler = () => {setIsMobileSideBarVisible(true)}
	const hideMobileSideBarHandler = () => {
		setIsMobileSideBarVisible(false)
	}

	return (
		<div>
			<Navtopbar navigation={navigation} role={role} refreshHandler={navRefreshHandler} />
			<Container fluid>
				<Row>
					<NavSideBarDesktop navigation={navigation} refreshHandler={navRefreshHandler} />
					<NavSideBarMobile navigation={navigation} isVisible={isMobileSideBarVisible} onHide={hideMobileSideBarHandler} refreshHandler={navRefreshHandler} />

					<Col xs={12} md={8} className="min-vh-100 position-relative">
						<button onClick={showMobileSideBarHandler} className={`d-block d-md-none ${classes.hamburger}`}>
							<i className="bi bi-list"></i>
						</button>
						<Component />
					</Col>
				</Row>
			</Container>
		</div>
	)
}