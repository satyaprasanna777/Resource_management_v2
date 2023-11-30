import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

function App() {
   return (
      <div className='App'>
         <header className='App-header'>
            <Link to="/admin-dashboard">Resource Management</Link>
            <Link to="/newrequest-component">NewRequestComponent</Link>
         </header>
      </div>
   )
}

export default App
