import { AppShell, Group, Burger, Menu, Avatar, NavLink } from "@mantine/core"
import { PropsWithChildren, useState } from "react"
import { Outlet } from "react-router-dom"
import { HeaderLogo } from "./HeaderLogo"
import layoutStyles from './layout.module.scss';
import { Icon } from "../components/Icon";
import { useAuth } from "../providers/AuthProvider";

export type AuthenticatedLayoutProps = PropsWithChildren & {

}

export const AuthenticatedLayout = (props: AuthenticatedLayoutProps) => {
  const [opened, setOpened] = useState(false);
  const { logout } = useAuth();

  const toggle = () => {
    setOpened(!opened);
  }

  return <AppShell
    header={{ height: 60 }}
    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    padding="md"
  >
    <AppShell.Header className={layoutStyles.header} px='md'>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
      <HeaderLogo />
      <Menu>
        <Menu.Target>
          <Avatar src={null} alt="no image here" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<Icon name='logout' />}
            onClick={logout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </AppShell.Header>
    <AppShell.Navbar p="md">
      <NavLink
        label='My Tasks'
        active
      />
    </AppShell.Navbar>
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
}