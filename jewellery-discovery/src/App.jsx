import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { OmniChannelProvider } from './context/OmniChannelContext'

function App() {
  return (
    <AuthProvider>
      <OmniChannelProvider>
        <AppRoutes />
      </OmniChannelProvider>
    </AuthProvider>
  )
}

export default App
