'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react'

export default function QueryProvider({children}) {
    const [client] = useState(()=> new QueryClient())
  return (
    <div>
        <QueryClientProvider client={client}>
            {children}
             {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    </div>
  )
}
