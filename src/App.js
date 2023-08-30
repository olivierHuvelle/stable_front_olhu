import {createElement} from 'react'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import {Layout} from './layout/Layout/Layout'
import {Navigation} from './navigation/Navigation'

import {PageOne} from './pages/pageone/Pageone'
import {PageTwo} from './pages/pagetwo/Pagetwo'
import {Tmp} from './pages/tmp/Tmp'
import {Error} from './pages/error/Error'
import {PagePension} from './pages/backoffice/pension/PagePension'
import {PageAuthentication} from './pages/authentication/PageAuthentication'
import {PageNotFound} from './pages/404/PageNotFound'
import {PageRgpd} from './pages/rgpd/PageRgpd'
import {PageConfirmation} from './pages/authentication/confirmation/PageConfirmation'

const routerMapper = {
	PageOne,
	PageTwo,
	Tmp,
	PagePension,
	PageAuthentication
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/calendar" />
	},
	{
		path: '/rgpd',
		element: <PageRgpd />
	},
	{
		path: '/confirmation',
		element: <PageConfirmation />
	},
	{
		path: '/',
		element: <Layout/>,
		errorElement: <Error/>,
		children: [...Navigation.getRouter().map(route => ({
			path: route.path,
			element: createElement(routerMapper[route.component])
		})),
		{
			path: '/error',
			element: <Error/>
		}]
	},
	{
		path: '*',
		element: <PageNotFound />
	},
])

export const App = () => {
	return (
		<RouterProvider router={router}/>
	)
}