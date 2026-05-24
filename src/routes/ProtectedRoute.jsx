import { Navigate } from 'react-router-dom'
import { hasSession } from '../utils/storage'

const ProtectedRoute = ({ children }) => {
  if (!hasSession()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
