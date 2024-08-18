import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' exact element={<HomePage/>}/>
    </Routes>
  )
}

export default App

