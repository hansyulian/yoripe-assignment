import { Paper, Grid, Text, Group, ActionIcon, Pill, Chip, Button } from "@mantine/core";
import classes from './TaskItem.module.scss';
import { Icon, IconNames } from "./Icon";

export type TaskItemProps = {
  record: Task;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const priorityChipColors: Record<TaskPriority, string | undefined> = {
  LOW: undefined,
  NORMAL: 'green',
  HIGH: 'yellow',
  URGENT: 'red'
}

export const TaskItem = (props: TaskItemProps) => {
  const { record, onEdit, onDelete, onComplete } = props;
  const canComplete = record.status === 'PENDING';
  const canDelete = record.status === 'PENDING';

  return <Paper shadow='md' p='md' mt='sm' className={classes.container}>
    <Grid>
      <Grid.Col className={classes.header}>
        <Group>
          <Text fw='bold'>{record.title}</Text>
        </Group>
        <Group>
          <Chip checked={true} color={priorityChipColors[record.priority]} icon={<Icon name='urgent' />}>
            {record.priority}
          </Chip>
        </Group>
      </Grid.Col>
      <Grid.Col>
        <Text>{record.description}</Text>
      </Grid.Col>
      <Grid.Col >
        <Group justify="flex-end">
          <Button color='cyan' onClick={onEdit} leftSection={<Icon name='edit' />}>
            Edit
          </Button>
          {canComplete && <Button color='green' onClick={onComplete} leftSection={<Icon name='check' />}>
            Complete
          </Button>}
          {canDelete && <Button color='red' onClick={onDelete} leftSection={<Icon name='delete' />}>
            Delete
          </Button>}
        </Group>
      </Grid.Col>
    </Grid>
  </Paper>
}