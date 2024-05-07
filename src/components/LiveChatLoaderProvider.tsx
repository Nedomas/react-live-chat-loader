import React, { useState } from 'react'
import * as Providers from '../providers'
import { State, Provider } from '../types'
import { LiveChatLoaderContext } from '../context'

interface LiveChatLoaderProps {
  provider: Provider
  children: React.ReactNode
  idlePeriod?: number
  maxIdlePeriod?: number
  providerKey: string
  appID?: string
  baseUrl?: string
  // locale is only relevant to certain providers, e.g. Messenger and Chatwoot
  locale?: string
  beforeInit?: () => void
  onReady?: () => void
}

export const LiveChatLoaderProvider = ({
  provider,
  children,
  idlePeriod = 5000,
  maxIdlePeriod = 5000,
  baseUrl,
  ...props
}: LiveChatLoaderProps): JSX.Element | null => {
  const [state, setState] = useState<State>('initial')
  const value = {
    provider,
    idlePeriod,
    maxIdlePeriod,
    state,
    setState,
    baseUrl,
    ...props
  }

  const chatProvider = Providers[provider]

  if (!chatProvider) {
    //eslint-disable-next-line no-console
    console.error(
      `Unknown provider given to react-live-chat-loader: ${provider}`
    )
    return null
  }

  return (
    <LiveChatLoaderContext.Provider value={value}>
      <link
        href={baseUrl || chatProvider.domain}
        rel="preconnect"
        crossOrigin=""
      />
      {children}
    </LiveChatLoaderContext.Provider>
  )
}

export default LiveChatLoaderProvider
