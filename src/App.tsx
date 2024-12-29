import { Spin } from 'antd'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { router } from '@/routes'

import { authApi } from './apis'
import { LOCAL_STORAGE_KEYS } from './utils/constants'
import { IErrorResponse, ILoginResponse } from './interfaces'

function App() {
  const queryClient = useQueryClient()

  const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEYS.isLoggedIn)

  const [targetUrl, setTargetUrl] = useState<string>('')

  const { mutate: mutateGetToken, isPending } = useMutation<ILoginResponse, AxiosError<IErrorResponse>, string>({
    mutationFn: authApi.getToken,
    onSuccess: () => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.isLoggedIn, 'true')
      if (targetUrl) {
        window.location.href = targetUrl
      }
    },
    onError: (e: AxiosError) => {
      console.log('error', e)
    }
  })

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === 'syncLoginToWeb') {
        const { userId, targetUrl } = event.data
        mutateGetToken(userId)
        setTargetUrl(targetUrl)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isLoggedIn, queryClient])

  if (isPending) {
    return <Spin size='large' />
  }

  return <RouterProvider router={router} />
}

export default App
