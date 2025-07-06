import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import AddTask from './pages/AddTasks'
import Stats from './pages/Stats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/add' element={<AddTask />} />
            {/* <Route path='/stats' element={<Stats />} />  */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
