import { AppShell, Group, Burger, Skeleton } from "@mantine/core"
import { PropsWithChildren, useState } from "react"
import { Outlet } from "react-router-dom"
import { HeaderLogo } from "./HeaderLogo"

export type AuthenticatedLayoutProps = PropsWithChildren & {

}

export const AuthenticatedLayout = (props: AuthenticatedLayoutProps) => {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!opened);
  }

  return <AppShell
    header={{ height: 60 }}
    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    padding="md"
  >
    <AppShell.Header>
      <HeaderLogo />
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
    </AppShell.Header>
    <AppShell.Navbar p="md">
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Navbar>
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
}