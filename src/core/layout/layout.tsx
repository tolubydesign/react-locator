import React, { ReactNode } from "react"
import NavigationalBar from "../header/navigation/navigational-bar"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {

  return (
    <main>
      <NavigationalBar />
      {children}
    </main>
  )
}