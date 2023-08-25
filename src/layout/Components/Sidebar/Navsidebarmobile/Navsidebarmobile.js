import {Offcanvas} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import classes from './Navsidebarmobile.module.css'

export const NavSideBarMobile = props => {
	const {t} = useTranslation()

	const subMenuChangeHandler = subMenuName => {
		if(props.navigation.activeSubMenuName !== subMenuName){
			props.navigation.submenuName = subMenuName
			props.refreshHandler()
		}
	}

	return (
		<Offcanvas show={props.isVisible} onHide={props.onHide} {...{backdrop: true}}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title></Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className={classes.sidebar}>
				<ul>
					{props.navigation.submenus.map((submenu,index) => (
						<li key={index} className={`nav-item border ${props.navigation.activeSubMenuName === submenu.name ? classes.active : ''}`} onClick={() => subMenuChangeHandler(submenu.name)}>
							<span className={'nav-link'}>{t(submenu.message)}</span>
						</li>
					))}
				</ul>
			</Offcanvas.Body>
		</Offcanvas>
	)
}