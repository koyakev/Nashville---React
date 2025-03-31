import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './components/List'
import Sheet from './components/Sheet'
import Add from './components/Add'
import EditSongs from './components/EditSongs'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<List />} />
					<Route path='/sheet/:id' element={<Sheet />} />
					<Route path='/add' element={<Add />} />
					<Route path='/editsongs' element={<EditSongs />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
