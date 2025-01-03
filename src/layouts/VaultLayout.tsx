import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { NotificationArgsProps } from 'antd'

import { useAuth, useBoolean } from '@/hooks'
import { notificationKeys } from '@/keys'

import { VaultHeader } from './vault/Header'
import { Sidebar } from './vault/Sidebar'
import { ENVIRONMENT_KEYS } from '@/utils/constants'
import { Space, notification } from 'antd'
import { CustomBtn } from '@/components'
import { IDataResponse, IErrorResponse, ILoginHistoryData } from '@/interfaces'
import { AxiosError } from 'axios'
import { locationApi, loginHistoryApi } from '@/apis'

const { Content } = Layout

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  overflowY: 'auto',
  borderRadius: 12,
  paddingLeft: 16,
  paddingRight: 16
}

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
}
type NotificationPlacement = NotificationArgsProps['placement']
export function VaultLayout() {
  const queryClient = useQueryClient()
  const location = useLocation()

  const socketRef = useRef<Socket | null>(null)

  const { currentUser } = useAuth()

  const { value: isShowPopupConfirmSync, setTrue: setShowPopupConfirmSync } = useBoolean(false)

  const [api, contextHolder] = notification.useNotification()

  const handleSyncLoginToExtension = () => {
    api.destroy()
    window.postMessage({ message: 'syncLoginToExtension', userId: currentUser?.id }, window.location.origin)
  }

  const handleCancelSyncLoginToExtension = () => {
    api.destroy()
  }

  const { mutate: mutateStoreLoginHistory } = useMutation<IDataResponse, AxiosError<IErrorResponse>, ILoginHistoryData>(
    {
      mutationFn: loginHistoryApi.store
    }
  )

  const requestLocationAndSave = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const locationParams = {
              lat: latitude,
              lon: longitude,
              format: 'json'
            }
            const locationDetail = await locationApi.getLocationDetail(locationParams)

            mutateStoreLoginHistory({
              lat: latitude,
              lon: longitude,
              address: locationDetail.display_name
            })
          } catch (error) {
            console.error(error)
          }
        },
        (error) => {
          console.error('Location access denied', error)
        }
      )
    } else {
      console.warn('Geolocation is not supported by this browser.')
    }
  }

  useLayoutEffect(() => {
    const openNotification = (placement: NotificationPlacement) => {
      api.info({
        message: 'Do you want to sync login to extension?',
        description: (
          <Space className='w-full justify-between'>
            <CustomBtn
              title='Cancel'
              size='small'
              className='!text-sm !h-9'
              onClick={handleCancelSyncLoginToExtension}
            />
            <CustomBtn
              title='Sync'
              type='primary'
              size='small'
              className='!text-sm !h-9'
              onClick={handleSyncLoginToExtension}
            />
          </Space>
        ),
        placement,
        duration: 0
      })
    }

    if (location.state?.fromLogin && !isShowPopupConfirmSync && currentUser) {
      setShowPopupConfirmSync()
      openNotification('top')
      requestLocationAndSave()
    }
  }, [location, currentUser, isShowPopupConfirmSync])

  useEffect(() => {
    if (!currentUser) return

    if (!socketRef.current) {
      socketRef.current = io(ENVIRONMENT_KEYS.VITE_SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true
      })

      const socket = socketRef.current
      const userEmail = currentUser.email

      socket.on('connect', () => {
        socket.emit('register', { email: userEmail, socketId: socket.id })
      })

      socket.on('newNotification', () => {
        queryClient.invalidateQueries(notificationKeys.list())
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [currentUser])

  return (
    <Layout style={layoutStyle}>
      <Sidebar />
      <Layout>
        <VaultHeader />
        <Content style={contentStyle}>
          {contextHolder}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
