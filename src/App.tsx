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
import Auth from './pages/Auth';
import { store } from './store/store';
import { Provider } from 'react-redux';
import AccessTokenProvider from './providers/AccessTokenPersistProvider';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/authentication"
        element={
          <Auth />
        }
      />
      <Route element={<AccessTokenProvider />}>
        <Route
          index
          element={
            <Home />

          }
        />
      </Route>
    </Route>))
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme='light' storageKey='color-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
