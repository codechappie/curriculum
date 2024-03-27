'use client'
import { Provider } from 'react-redux';
import store from './store';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation'


export default function Providers({ children }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Provider store={store}>
        {children}
      </Provider>
    </NextUIProvider>
  )
}