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
import { useState, createContext, type Dispatch, type SetStateAction } from 'react'
import type { GeminiResponseProps } from './types/GeminiResponseProps'

interface AppContextProps {
  GeminiResponse: GeminiResponseProps | undefined,
  setGeminiResponse: Dispatch<SetStateAction<GeminiResponseProps | undefined>>
}

export const AppContext = createContext<AppContextProps>({
  GeminiResponse: {
    job: {
        title: "",
        company: "",
        date: ""
    },
    compatibilityScore: 0,
    skillsSummary: {
        matched: 0,
        missing: 0
    },
    cvKeywords: [],
    jdKeywords: [],
    matchingSkills: [],
    missingRequirements: [],
    suggestions: [],
    summary: ""
  },
  setGeminiResponse: () => {}
});

function App() {

  const [GeminiResponse, setGeminiResponse] = useState<GeminiResponseProps>();

  return (
    <AppContext value={{GeminiResponse, setGeminiResponse}}>
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
    </AppContext>
  )
}

export default App
