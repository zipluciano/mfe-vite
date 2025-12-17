import { useGlobalStore } from 'shared/useGlobalStore'
import { Button } from 'shared/Button'
import { Card } from 'shared/Card'
import './index.css'

function App() {
  const {
    count,
    user,
    theme,
    toggleTheme,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useGlobalStore()

  const handleAddNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const messages = {
      info: 'This is an info notification',
      success: 'Operation completed successfully!',
      warning: 'Please be careful with this action',
      error: 'Something went wrong!',
    }
    addNotification({ message: messages[type], type })
  }

  const notificationColors: Record<'info' | 'success' | 'warning' | 'error', string> = {
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <div className="space-y-4">
      <Card title="State Observer" variant="bordered">
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Counter Value:</span>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{count}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">User Status:</span>
            <span
              className={`text-sm font-medium ${
                user ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {user ? `${user.name}` : 'Not logged in'}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            These values are managed by Remote A
          </p>
        </div>
      </Card>

      <Card title="Theme Toggle" variant="bordered">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Current theme: <span className="font-medium">{theme}</span>
          </span>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            Toggle to {theme === 'light' ? 'dark' : 'light'}
          </Button>
        </div>
      </Card>

      <Card title="Notifications" variant="bordered">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNotification('info')}
            >
              + Info
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNotification('success')}
            >
              + Success
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNotification('warning')}
            >
              + Warning
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNotification('error')}
            >
              + Error
            </Button>
          </div>

          {notifications.length > 0 && (
            <>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {notifications.map((notification: { id: string; message: string; type: 'info' | 'success' | 'warning' | 'error' }) => (
                  <div
                    key={notification.id}
                    className={`flex items-center justify-between p-2 rounded border text-sm ${
                      notificationColors[notification.type]
                    }`}
                  >
                    <span>{notification.message}</span>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="ml-2 hover:opacity-70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={clearNotifications}>
                Clear all
              </Button>
            </>
          )}

          {notifications.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">No notifications</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default App
