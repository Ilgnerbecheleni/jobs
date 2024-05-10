import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Menu from './Components/Menu'
import Rotas from './Rotas'
import { AuthGoogleProvider } from './contexts/google/authGoogle'

function App() {
 

  return (
    <>
  
    <AuthGoogleProvider>
    <Menu/>
    <Rotas/>
    </AuthGoogleProvider>
    

    
    </>
  )
}

export default App
