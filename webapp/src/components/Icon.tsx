import { rem } from "@mantine/core";
import { IconAt, IconLock, IconLogout, IconUser } from "@tabler/icons-react";

const iconMap = {
  logout: IconLogout,
  at: IconAt,
  lock: IconLock,
  user: IconUser,
}

export type IconProps = {
  name: keyof typeof iconMap;
  size?: number | string;
}

export const Icon = (props: IconProps) => {
  const { name, size = 16 } = props;
  const Element = iconMap[name];

  return <Element style={{ width: rem(size), height: rem(size) }} />;
};
