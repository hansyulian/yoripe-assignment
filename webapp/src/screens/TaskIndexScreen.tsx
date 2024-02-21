import { ActionIcon, Box, Loader, Modal, Text } from "@mantine/core";
import { useTasks } from "../hooks/useTasks";
import { Icon } from "../components/Icon";
import classes from './TaskIndexScreen.module.scss'
import { useCallback, useEffect, useRef, useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { useAsyncHandler } from "../hooks/useAsyncHandler";
import { useCreateTaskRequest } from "../hooks/useCreateTaskRequest";
import { TaskItem } from "../components/TaskItem";
import { useDeleteTaskRequest } from "../hooks/useDeleteTaskRequest";
import { useUpdateTaskRequest } from "../hooks/useUpdateTaskRequest";
import { v4 as uuid } from 'uuid';

export type TaskIndexScreenProps = {

}
const TaskIndexScreen = (props: TaskIndexScreenProps) => {
  const { data } = useTasks();
  const [formModalOpened, setFormModalOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const optimisticHolder = useRef<Record<string, Task | null>>({}); // null = optimistic delete
  const [displayRecords, setDisplayRecords] = useState<Task[]>([]);
  const createTaskRequest = useCreateTaskRequest();
  const deleteTaskRequest = useDeleteTaskRequest();
  const updateTaskRequest = useUpdateTaskRequest();

  const recalculateOptimisticData = useCallback(() => {
    // in order to provide robustness in case of race condition
    const result: Task[] = [];
    const takenIndex: Record<string, boolean> = {}
    const optimisticIndex = optimisticHolder.current;
    // to make sure the order are maintained, lets try to follow the server data first, then continue with the remaining
    for (const record of data?.records || []) {
      const id = record.id;
      takenIndex[id] = true;
      const optimisticValue = optimisticIndex[id];
      if (optimisticValue !== null) { // in case of deleted record, we skip it
        if (optimisticValue === undefined) { // undefined = unchanged record, just take from the server
          result.push(record);
        } else {
          result.push(optimisticValue) // otherwise, it will be a full task object which means optimistic updated
        }
      }
    }
    for (const record of Object.values(optimisticIndex)) {
      if (record !== null && !takenIndex[record.id]) { // takenIndex == false -> new record
        result.push(record);
      }
    }
    setDisplayRecords(result);
  }, [data?.records])

  useEffect(() => {
    recalculateOptimisticData();
  }, [recalculateOptimisticData])

  const { action: createTask } = useAsyncHandler(async (taskForm: TaskForm) => {
    let id = uuid();
    try {
      const newOptimisticTask: Task = {
        id,
        ...taskForm,
      };
      setFormModalOpened(false);
      optimisticHolder.current[id] = newOptimisticTask;
      recalculateOptimisticData();
      const result = await createTaskRequest(taskForm);
      delete optimisticHolder.current[id];
      id = result.id;
      optimisticHolder.current[result.id] = result;
      recalculateOptimisticData();  // to sync back the changes from server
    } catch (err) {
      // in case any error, revert back, then throw the error to let the async handler show the error
      delete optimisticHolder.current[id];
      recalculateOptimisticData();
      throw err;
    }
  });
  const { action: updateTask } = useAsyncHandler(async (id: string, taskForm: TaskForm, oldTaskData: Task) => {
    try {
      setFormModalOpened(false);
      const updatedData = {
        ...oldTaskData,
        ...taskForm,
      }
      optimisticHolder.current[id] = updatedData;
      recalculateOptimisticData();
      const result = await updateTaskRequest(id, updatedData);
      optimisticHolder.current[id] = result;
      recalculateOptimisticData(); // to sync back the changes from server
    } catch (err) {
      // in case any error, revert back, then throw the error to let the async handler show the error
      optimisticHolder.current[id] = oldTaskData;
      recalculateOptimisticData();
      throw err;
    }
  });

  const { action: deleteTask } = useAsyncHandler(async (id: string) => {
    try {
      optimisticHolder.current[id] = null;
      recalculateOptimisticData();
      await deleteTaskRequest(id);
    } catch (err) {
      // in case any error, revert back, then throw the error to let the async handler show the error
      delete optimisticHolder.current[id];
      recalculateOptimisticData();
      throw err;
    }
  })

  const showAddDialog = () => {
    setSelectedTask(undefined);
    setFormModalOpened(true);
  }

  const edit = (record: Task) => {
    setSelectedTask(record);
    setFormModalOpened(true);
  }

  const save = (data: TaskForm) => {
    if (selectedTask) {
      updateTask(selectedTask.id, data, selectedTask)
      return;
    }
    createTask(data);
  }

  const remove = (record: Task) => {
    deleteTask(record.id);
  }

  const complete = (record: Task) => {
    updateTask(record.id, { ...record, status: 'COMPLETED' }, record)
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
    <Box>
      {displayRecords.map(record =>
        <TaskItem key={`task-${record.id}`} record={record} onEdit={() => edit(record)} onDelete={() => remove(record)} onComplete={() => complete(record)} />
      )}
    </Box>
    <Modal opened={formModalOpened} onClose={() => setFormModalOpened(false)} title='New Task' size='xl'>
      <TaskForm createForm data={selectedTask} onSave={save} />
    </Modal>
  </Box>
}

export default TaskIndexScreen;