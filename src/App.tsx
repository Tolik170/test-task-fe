import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <div>
        <TitleWithDescription title='Title' />
        <a href='https://vitejs.dev' rel='noreferrer' target='_blank'>
          <img alt='Vite logo' className='logo' src={ viteLogo } />
        </a>
        <a href='https://reactjs.org' rel='noreferrer' target='_blank'>
          <img alt='React logo' className='logo react' src={ reactLogo } />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>
        { import.meta.env.VITE_API_URL }
      </h2>
      <div className='card'>
        <button onClick={ () => setCount((count) => count + 1) }>
          count is
          { ' ' }
          { count }
        </button>
        <p>
          Edit 
          { ' ' }
          <code>src/App.tsx</code>
          { ' ' }
          and save to test HMR,
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
