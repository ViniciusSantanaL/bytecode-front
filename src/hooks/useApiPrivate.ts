import { useAuth } from './useAuth'
import { useEffect } from 'react'
import { HttpPrivate } from '../service/api'

const useApiPrivate = () => {
  const { token: appToken } = useAuth()
  useEffect(() => {
    const requestInterceptor = HttpPrivate.interceptors.request.use(
      (config) => {
        // @ts-ignore
        if (!config.headers['Authorization']) {
          // @ts-ignore
          config.headers['Authorization'] = `Bearer ${appToken?.token}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = HttpPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          // const newAccessToken = await refresh()
          // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return HttpPrivate(prevRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      HttpPrivate.interceptors.request.eject(requestInterceptor)
      HttpPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [appToken])
}

export default useApiPrivate
