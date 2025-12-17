/// <reference types="vite/client" />

declare module 'shared/store' {
  export * from 'shared/src/store'
}

declare module 'shared/useGlobalStore' {
  import { GlobalState } from 'shared/src/store/globalStore'
  export const useGlobalStore: import('zustand').UseBoundStore<import('zustand').StoreApi<GlobalState>>
}

declare module 'shared/Button' {
  import { FC, ButtonHTMLAttributes, ReactNode } from 'react'
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    children: ReactNode
  }
  export const Button: FC<ButtonProps>
}

declare module 'shared/Card' {
  import { FC, ReactNode } from 'react'
  export interface CardProps {
    title?: string
    description?: string
    variant?: 'default' | 'bordered' | 'elevated'
    className?: string
    children: ReactNode
  }
  export const Card: FC<CardProps>
}
