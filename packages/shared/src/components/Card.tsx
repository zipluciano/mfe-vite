import React from 'react'

export interface CardProps {
  title?: string
  description?: string
  variant?: 'default' | 'bordered' | 'elevated'
  className?: string
  children: React.ReactNode
}

const variantStyles = {
  default: 'bg-white dark:bg-gray-800',
  bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30',
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  variant = 'bordered',
  className = '',
  children,
}) => {
  return (
    <div
      className={`
        rounded-xl p-4 sm:p-6 transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}
      <div>{children}</div>
    </div>
  )
}
