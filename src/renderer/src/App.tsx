import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Results from './components/Results'
import { RouterProvider } from 'react-router-dom'
import { FC } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/results',
    element: <Results />
  }
])

const App: FC = () => <RouterProvider router={router} />

export default App
