import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Layout} from './layout/Layout/Layout'
import {Navigation} from './layout/navigation'

import {PageOne} from './pages/pageone/Pageone'
import {PageTwo} from './pages/pagetwo/Pagetwo'
import {Tmp} from './pages/tmp/Tmp'
import {Error} from './pages/error/Error'

const routerMapper = {
	PageOne,
	PageTwo,
	Tmp
}

const navigation = new Navigation()

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: navigation.router.map(route => ({
			path: `/${route.path}`,
			element: routerMapper[route.component]()
		}))
	}
])

export const App = () => {
	return (
		<RouterProvider router={router} />
	)
}