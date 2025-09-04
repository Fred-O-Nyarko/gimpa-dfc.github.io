import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GIMPA Timetable - MSc Digital Forensics',
  description: 'Ghana Institute of Management and Public Administration Timetable',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}