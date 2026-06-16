import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store, { persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<App />
				</PersistGate>
			</Provider>
		</Router>
	</React.StrictMode>
)
