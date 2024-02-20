import { Paper, Grid, Text, Group, ActionIcon, Pill, Chip } from "@mantine/core";
import classes from './TaskItem.module.scss';
import { Icon, IconNames } from "./Icon";

export type TaskItemProps = {
  record: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityChipColors: Record<TaskPriority, string | undefined> = {
  LOW: undefined,
  NORMAL: 'green',
  HIGH: 'yellow',
  URGENT: 'red'
}
const priorityChipIconName: Record<TaskPriority, IconNames> = {
  LOW: 'check',
  NORMAL: 'check',
  HIGH: 'urgent',
  URGENT: 'urgent'
}

export const TaskItem = (props: TaskItemProps) => {
  const { record, onEdit, onDelete } = props;

  return <Paper shadow='md' p='md' className={classes.container}>
    <Grid>
      <Grid.Col className={classes.header}>
        <Group>
          <Text fw='bold'>{record.title}</Text>
          <Chip checked={true} color={priorityChipColors[record.priority]} icon={<Icon name={priorityChipIconName[record.priority]} />}>
            {record.priority}
          </Chip>
        </Group>
        <Group>
          <ActionIcon color='cyan' onClick={onEdit}>
            <Icon name='edit'></Icon>
          </ActionIcon>
          <ActionIcon color='red' onClick={onDelete}>
            <Icon name='delete'></Icon>
          </ActionIcon>
        </Group>
      </Grid.Col>
      <Grid.Col>
        <Text>{record.description}</Text>
      </Grid.Col>
    </Grid>
  </Paper>
}