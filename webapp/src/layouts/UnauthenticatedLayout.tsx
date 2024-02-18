import { AppShell, Group, Burger, Skeleton } from "@mantine/core"
import { PropsWithChildren, useState } from "react"
import { Outlet } from "react-router-dom"
import { HeaderLogo } from "./HeaderLogo"
import layoutStyles from './layout.module.scss';

export type UnauthenticatedLayoutProps = PropsWithChildren & {

}

export const UnauthenticatedLayout = (props: UnauthenticatedLayoutProps) => {

  return <AppShell
    header={{ height: 60 }}
    padding="md"
  >
    <AppShell.Header className={layoutStyles.headerUnauthenticated}>
      <HeaderLogo />
    </AppShell.Header>
    <AppShell.Main className={layoutStyles.mainUnauthenticated}>
      <Outlet />
    </AppShell.Main>
  </AppShell>
}