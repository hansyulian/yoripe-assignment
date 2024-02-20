import { ActionIcon, Box, Button, Grid, GridCol, Loader, Modal, Paper, Text } from "@mantine/core";
import { useTasks } from "../hooks/useTasks";
import { Icon } from "../components/Icon";
import classes from './TaskIndexScreen.module.scss'
import { useMemo, useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { useAsyncHandler } from "../hooks/useAsyncHandler";
import { useHotkeys } from "@mantine/hooks";
import { useCreateTaskRequest } from "../hooks/useCreateTaskRequest";
import { TaskItem } from "../components/TaskItem";

export type TaskIndexScreenProps = {

}

const defaultTaskFormValues: TaskForm = {
  description: '',
  priority: 'NORMAL',
  title: '',
  status: 'PENDING',
};

const TaskIndexScreen = (props: TaskIndexScreenProps) => {
  const { data } = useTasks();
  const [optimisticData, setOptimisticData] = useState<Task[]>([]);
  const [formModalOpened, setFormModalOpened] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskForm>(defaultTaskFormValues);
  const createTaskRequest = useCreateTaskRequest();
  const [loading, saveTask] = useAsyncHandler(async () => {
    const newOptimisticTask: Task = {
      id: '-',
      ...taskForm,
    };
    setFormModalOpened(false);
    setOptimisticData([...optimisticData, newOptimisticTask]);
    const result = await createTaskRequest(taskForm);
    Object.assign(newOptimisticTask, result);
    setOptimisticData([...optimisticData, newOptimisticTask]);
  })
  const canSave = !!taskForm?.title.length && !!taskForm?.description.length;

  const showAddDialog = () => {
    setTaskForm(defaultTaskFormValues);
    setFormModalOpened(true);
  }
  const records = useMemo(() => {
    const result = [
      ...data?.records || [],
      ...optimisticData,
    ];
    return result;
  }, [data?.records, optimisticData])

  const save = () => {
    if (!canSave) {
      return;
    }
    saveTask();
  }

  useHotkeys([[
    'enter', save,
  ]]);

  const edit = (record: Task) => {
    console.log('edit', record);
  }

  const remove = (record: Task) => {
    console.log('delete', record);
  }


  if (!data) {
    return <Loader />
  }

  return <Box>
    <Box className={classes.header}>
      <Text fw='bold'>My tasks</Text>
      <ActionIcon onClick={showAddDialog}>
        <Icon name='add' />
      </ActionIcon>
    </Box>
    <Box mt='md'>
      {records.map(record =>
        <TaskItem key={`task-${record.id}`} record={record} onEdit={() => edit(record)} onDelete={() => remove(record)} />
      )}
    </Box>
    <Modal opened={formModalOpened} onClose={() => setFormModalOpened(false)} title='New Task' size='xl'>
      <TaskForm createForm onChange={setTaskForm} data={taskForm} />
      <Grid>
        <Grid.Col>
          <Button onClick={save} disabled={!canSave} loading={loading}>Save</Button>
        </Grid.Col>
      </Grid>
    </Modal>
  </Box>
}

export default TaskIndexScreen;