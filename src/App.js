import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Layout} from './layout/Layout/Layout'
import {Navigation} from './navigation/Navigation'

import {PageOne} from './pages/pageone/Pageone'
import {PageTwo} from './pages/pagetwo/Pagetwo'
import {Tmp} from './pages/tmp/Tmp'
import {Error} from './pages/error/Error'

const routerMapper = {
	PageOne,
	PageTwo,
	Tmp
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		errorElement: <Error/>,
		children: Navigation.getRouter().map(route => ({
			path: route.path,
			element: routerMapper[route.component]()
		}))
	}
])

export const App = () => {
	return (
		<RouterProvider router={router}/>
	)
}