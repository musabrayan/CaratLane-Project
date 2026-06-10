import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/Home'
import OccasionPage from '../pages/OccasionPage'
import ProductDetails from '../pages/ProductDetails'
import Reserve from '../pages/Reserve'
import Stores from '../pages/Stores'
import About from '../pages/About'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="occasion/:occasion" element={<OccasionPage />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route
            path="reserve"
            element={
              <ProtectedRoute>
                <Reserve />
              </ProtectedRoute>
            }
          />
          <Route path="stores" element={<Stores />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes