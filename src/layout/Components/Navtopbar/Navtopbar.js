import {Nav} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import classes from './Navtopbar.module.css'

export const Navtopbar = props => {
	const {t} = useTranslation()

	const menuChangeHandler = menuName => {
		if(props.navigation.activeMenuName !== menuName){
			props.navigation.menuName = menuName
			props.refreshHandler()
		}
	}

	return (
		<Nav className={`justify-content-center grid text-center ${classes.navbar}`}>
			{props.navigation.menusForRole.map((menu, index) => (
				<Nav.Item key={index} className={classes.icon}>
					<div onClick={() => {
						menuChangeHandler(menu.name)
					}}>
						<div
							className={`${classes.icon} ${menu.name === props.navigation.activeMenuName ? classes.active : ''}`}
							title={t(menu.message)}>
							<i className={menu.icon}></i>
						</div>
					</div>
				</Nav.Item>
			))}
		</Nav>
	)
}
