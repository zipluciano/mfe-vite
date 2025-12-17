import React, { Suspense } from 'react'
import { useGlobalStore } from 'shared/useGlobalStore'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'

const RemoteA = React.lazy(() => import('remoteA/App'))
const RemoteB = React.lazy(() => import('remoteB/App'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    <span className="ml-3 text-gray-600">Loading micro-frontend...</span>
  </div>
)

function App() {
  const { theme } = useGlobalStore()

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Micro-Frontend Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This demo showcases two React micro-frontends sharing state via Zustand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-700 px-4 sm:px-6 py-3">
              <h2 className="text-lg font-semibold text-white">Remote A</h2>
            </div>
            <div className="p-4 sm:p-6">
              <ErrorBoundary fallback={<div className="text-red-600">Failed to load Remote A</div>}>
                <Suspense fallback={<LoadingFallback />}>
                  <RemoteA />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-green-600 dark:bg-green-700 px-4 sm:px-6 py-3">
              <h2 className="text-lg font-semibold text-white">Remote B</h2>
            </div>
            <div className="p-4 sm:p-6">
              <ErrorBoundary fallback={<div className="text-red-600">Failed to load Remote B</div>}>
                <Suspense fallback={<LoadingFallback />}>
                  <RemoteB />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>Built with Vite + React + Module Federation + Zustand</p>
        </div>
      </footer>
    </div>
  )
}

export default App
