import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home'
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
    <h1 className="text-3xl font-bold underline">
      App
    </h1>
  )
}

export default App
