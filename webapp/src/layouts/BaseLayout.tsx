import { PropsWithChildren, Suspense } from "react"
import { Outlet } from "react-router-dom"

export type BaseLayoutProps = PropsWithChildren & {

}

export const BaseLayout = (props: BaseLayoutProps) => {
  return <div>
    Base layout
    <Outlet />
  </div>
}