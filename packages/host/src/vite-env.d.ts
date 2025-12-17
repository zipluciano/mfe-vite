/// <reference types="vite/client" />

declare module 'remoteA/App' {
  const App: React.ComponentType
  export default App
}

declare module 'remoteB/App' {
  const App: React.ComponentType
  export default App
}

declare module 'shared/store' {
  export * from 'shared/src/store'
}

declare module 'shared/useGlobalStore' {
  export { useGlobalStore } from 'shared/src/store/globalStore'
}

declare module 'shared/Button' {
  export { Button, ButtonProps } from 'shared/src/components/Button'
}

declare module 'shared/Card' {
  export { Card, CardProps } from 'shared/src/components/Card'
}
