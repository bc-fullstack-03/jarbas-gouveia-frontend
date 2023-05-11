import './App.css'
import Header from './components/header/Header'
import FeedView from './views/Feed/FeedView'

function App() {

  return (
    <>
    <Header />
    <main className='container'>
      <FeedView />
    </main></>
  )
}

export default App
