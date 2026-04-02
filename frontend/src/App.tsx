import { Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Dashboard Pages
import DashboardLayout from './layouts/DashboardLayout'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import AnalyzePage from './pages/dashboard/AnalyzePage'
import ResultsPage from './pages/dashboard/ResultsPage'
import InsightsPage from './pages/dashboard/InsightsPage'
import HistoryPage from './pages/dashboard/HistoryPage'

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
