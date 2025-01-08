import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import PropertyDetail from './components/PropertyDetail'
import { ThemeProvider } from './context/ThemeContext'
import AdminPropertyManager from './admin/admin'
import Home from './pages/home'
import Contact from './components/Contact'

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className='min-h-screen transition-colors duration-200 dark:bg-gray-900'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<AdminPropertyManager />} />
            <Route path='/property/:id' element={<PropertyDetail />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
