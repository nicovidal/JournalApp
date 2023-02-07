import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {

    const status=useCheckAuth();


  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
      {/* Login y registro */}
      {
        (status==='authenticated')
        ?<Route path="/*" element={<JournalRoutes />} />
        :<Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path='/*'element={<Navigate to='/auth/login'/>}/>
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* Journal */}
      {/* cualquier ruta que no sea auth entre por aqui */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  )
}
