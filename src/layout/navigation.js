import {PageOne} from '../pages/pageone/Pageone'
import {PageTwo} from '../pages/pagetwo/Pagetwo'
import {Tmp} from '../pages/tmp/Tmp'


export const roleCategories = {
	ADMIN: 'ADMIN',
	EMPLOYEE: 'EMPLOYEE',
	CLIENT: 'CLIENT'
}

export class Navigation {
	static instance = undefined

	constructor(role, activeSubMenuName = 'day') {
		const agendaSubMenus = [
			{
				name: 'day',
				message: 'common_nav_side_calendar_day',
				component: PageOne

				// ADD component here later on
			},
			{
				name: 'month',
				message: 'common_nav_side_calendar_month',
				component: PageTwo
			},
			{
				name: 'agenda',
				message: 'common_nav_side_calendar_agenda',
				component: Tmp
			}
		]
		const profileSelfSubMenu = {
			name: 'self',
			message: 'common_nav_side_profile_self',
			component: Tmp
		}

		this._role = role
		this._menus = [
			{
				name: 'calendar',
				message: 'common_nav_top_calendar',
				permission: [roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
				icon: 'bi bi-calendar',

				submenus: {
					[roleCategories.ADMIN]: agendaSubMenus,
					[roleCategories.EMPLOYEE]: agendaSubMenus,
					[roleCategories.CLIENT]: agendaSubMenus
				}
			},
			{
				name: 'community',
				message: 'common_nav_top_community',
				permission: [roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
				icon: 'bi bi-people',
				submenus: {
					[roleCategories.ADMIN]: [
						{
							name: 'client',
							message: 'common_nav_side_community_admin_client',
							component: Tmp
						},
						{
							name: 'employee',
							message: 'common_nav_side_community_admin_employee',
							component: Tmp
						},
						{
							name: 'invoice_admin',
							message: 'common_nav_side_community_admin_invoice',
							component: Tmp
						}
					],
					[roleCategories.EMPLOYEE]: [
						{
							name: 'client',
							message: 'common_nav_side_community_employee_client',
							component: Tmp
						},
						{
							name: 'invoice_employee',
							message: 'common_nav_side_community_employee_invoice',
							component: Tmp
						}
					],
					[roleCategories.CLIENT]: [
						{
							name: 'client',
							message: 'common_nav_side_community_client_client',
							component: Tmp
						},
						{
							name: 'horse',
							message: 'common_nav_side_community_client_horse',
							component: Tmp
						},
						{
							name: 'invoice_client',
							message: 'common_nav_side_community_client_invoice',
							component: Tmp
						}
					]
				}
			},
			{
				name: 'backoffice',
				message: 'common_nav_top_backoffice',
				permission: [roleCategories.ADMIN],
				icon: 'bi-wrench-adjustable',

				submenus: {
					[roleCategories.ADMIN]: [
						{
							name: 'pension',
							message: 'common_nav_side_backoffice_admin_pension',
							component: Tmp
						},
						{
							name: 'ride',
							message: 'common_nav_side_backoffice_admin_ride',
							component: Tmp
						},
						{
							name: 'additive',
							message: 'common_nav_side_backoffice_admin_additive',
							component: Tmp
						},
						{
							name: 'lesson',
							message: 'common_nav_side_backoffice_admin_lesson',
							component: Tmp
						}
					]
				}
			},
			{
				name: 'profile',
				message: 'common_nav_top_profile',
				permission: [roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
				icon: 'bi-gear',

				submenus: {
					[roleCategories.ADMIN]: [
						{
							name: 'stable',
							message: 'common_nav_side_profile_stable',
							component: Tmp
						},
						profileSelfSubMenu
					],
					[roleCategories.EMPLOYEE]: [profileSelfSubMenu],
					[roleCategories.CLIENT]: [profileSelfSubMenu]
				}
			}

		]
		this._activeSubmenuName = activeSubMenuName
		this._activeMenuName = this.getMenuNameFromSubMenuName(this._activeSubmenuName, this._role)
		Navigation.instance = this
	}

	get menus() {
		return this._menus
	}

	get menusForRole() {
		return this._menus.filter(menu => menu.submenus[this._role])
	}

	get submenus() {
		const menuIndex = this._menus.findIndex(menu => menu.name === this.activeMenuName)
		return this._menus[menuIndex].submenus[this._role]
	}

	get activeSubMenuName() {
		return this._activeSubmenuName
	}

	get activeMenuName() {
		return this._activeMenuName
	}

	get activeComponent() {
		const menuIndex = this._menus.findIndex(menu => menu.name === this.activeMenuName)
		return this._menus[menuIndex].submenus[this._role].find(submenu => submenu.name === this.activeSubMenuName).component
	}

	set submenuName(value) {
		this._activeSubmenuName = value
		this._activeMenuName = this.getMenuNameFromSubMenuName(value)
	}

	set menuName(value) {
		this._activeMenuName = value
		this._activeSubmenuName = this.getDefaultSubMenuNameByMenuName(value)
	}

	set role(value) {
		this._role = value
	}

	getMenuNameFromSubMenuName(submenuName) {
		for (const menu of this._menus) {
			if (menu.submenus && menu.submenus[this._role]) {
				const submenusForRole = menu.submenus[this._role];
				const submenu = submenusForRole.find(submenu => submenu.name === submenuName);
				if (submenu) {
					return menu.name
				}
			}
		}
	}

	getDefaultSubMenuNameByMenuName(menuName) {
		const mapping = {
			profile: 'self',
			community: 'client',
			backoffice: 'pension',
			calendar: 'day'
		}
		return mapping[menuName]
	}

}