import { useGlobalStore } from "shared/useGlobalStore";
import { Button } from "shared/Button";
import { Card } from "shared/Card";
import "./index.css";

function App() {
  const { count, increment, decrement, reset, user, setUser } = useGlobalStore();

  const handleSetUser = () => {
    setUser({
      id: "1",
      name: "Luciano Monteiro",
      email: "luciano@example.com"
    });
  };

  const handleClearUser = () => {
    setUser(null);
  };

  return (
    <div className="space-y-4">
      <Card title="Counter Control" variant="bordered">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={decrement}>
            -
          </Button>
          <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">{count}</span>
          <Button variant="outline" size="sm" onClick={increment}>
            +
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          This counter state is shared with Remote B via Zustand
        </p>
      </Card>

      <Card title="User Management" variant="bordered">
        {user ? (
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleClearUser}>
              Clear User
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No user logged in</p>
            <Button variant="primary" size="sm" onClick={handleSetUser}>
              Set Demo User
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default App;
