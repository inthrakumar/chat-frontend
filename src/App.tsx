import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home'
import { ThemeProvider } from './providers/ThemeProvider';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <Home />

        }
      />
    </Route>))
const App = () => {
  return (
    <ThemeProvider defaultTheme='light' storageKey='color-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
