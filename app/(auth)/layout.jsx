export default function AuthLayout({ children }) {
  return (
    // Uses the themed full-screen background and centers the content.
    // bg-gray-50 (light mode) / dark:bg-gray-950 (dark mode)
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      {children}
    </div>
  )
}