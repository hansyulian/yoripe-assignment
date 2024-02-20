import { rem } from "@mantine/core";
import { IconAt, IconCheck, IconEdit, IconExclamationCircle, IconLock, IconLogout, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";

const iconMap = {
  logout: IconLogout,
  at: IconAt,
  lock: IconLock,
  user: IconUser,
  add: IconPlus,
  delete: IconTrash,
  edit: IconEdit,
  urgent: IconExclamationCircle,
  check: IconCheck,
}

export type IconNames = keyof typeof iconMap;

export type IconProps = {
  name: IconNames;
  color?: string;
  size?: number | string;
}

export const Icon = (props: IconProps) => {
  const { name, size = 16, color } = props;
  const Element = iconMap[name];

  return <Element color={color} style={{ width: rem(size), height: rem(size) }} />;
};
