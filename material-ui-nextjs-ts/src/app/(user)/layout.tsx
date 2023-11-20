import AppBottom from '@/components/bottom/app.bottom'
import AppHeader from '@/components/header/app.header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Title from layout',
  description: 'title from layout',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <AppHeader />
    {children}
    <AppBottom />
  </>
  );
}
