import {Col} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import classes from './Navsidebardesktop.module.css'

export const NavSideBarDesktop = props => {
	const {t} = useTranslation()

	const subMenuChangeHandler = subMenuName => {
		if(props.navigation.activeSubMenuName !== subMenuName){
			props.navigation.submenuName = subMenuName
			props.refreshHandler()

		}
	}

	return (
		<Col md={4} className={`${classes.sidebar} d-none d-md-block min-vh-100`} >
			<ul className="nav flex-column">
				{props.navigation.submenus.map((submenu,index) => (
					<li key={index} className={`nav-item border ${props.navigation.activeSubMenuName === submenu.name ? classes.active : ''}`} onClick={() => subMenuChangeHandler(submenu.name)}>
						<span className={'nav-link'}>{t(submenu.message)}</span>
					</li>
				))}
			</ul>
		</Col>
	)
}