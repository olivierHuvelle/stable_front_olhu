import './App.css'
import {useTranslation} from 'react-i18next'
import {RoleSelect} from './shared/roles/RoleSelect'

function App() {
	const {t} = useTranslation()
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
					{t('hello')}
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
				<RoleSelect/>
			</header>
		</div>
	)
}

export default App
