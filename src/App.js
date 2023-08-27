import {createElement} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Layout} from './layout/Layout/Layout'
import {Navigation} from './navigation/Navigation'

import {PageOne} from './pages/pageone/Pageone'
import {PageTwo} from './pages/pagetwo/Pagetwo'
import {Tmp} from './pages/tmp/Tmp'
import {Error} from './pages/error/Error'
import {PagePension} from './pages/backoffice/pension/PagePension'

const routerMapper = {
	PageOne,
	PageTwo,
	Tmp,
	PagePension
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		errorElement: <Error/>,
		children: Navigation.getRouter().map(route => ({
			path: route.path,
			element: createElement(routerMapper[route.component])
		}))
	}
])

export const App = () => {
	return (
		<RouterProvider router={router}/>
	)
}