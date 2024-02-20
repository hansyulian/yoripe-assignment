import { useEffect, useState } from "react";
import { TextInputE } from "./TextInputE";
import { TextAreaE } from "./TextAreaE";
import { Grid, Select } from "@mantine/core";

export type TaskFormProps = {
  data?: TaskForm;
  onChange?: (data: TaskForm) => void;
  createForm?: boolean;
}

const priorityOptions = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
const statusOptions = ['PENDING', 'COMPLETED', 'DELETE'];

export const TaskForm = (props: TaskFormProps) => {
  const { onChange, createForm, data } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('NORMAL');
  const [status, setStatus] = useState<TaskStatus>('PENDING');

  useEffect(() => {
    setTitle(data?.title || '');
    setDescription(data?.description || '');
    setPriority(data?.priority || 'NORMAL');
    setStatus(data?.status || 'PENDING');
  }, [data]);

  useEffect(() => {
    onChange?.({
      title,
      description,
      priority,
      status,
    })
  }, [description, onChange, priority, status, title])

  return <Grid>
    <Grid.Col>
      <TextInputE
        label='Title'
        value={title}
        onChangeText={setTitle}
      />
    </Grid.Col>
    <Grid.Col>
      <TextAreaE
        label='Description'
        rows={10}
        value={description}
        onChangeText={setDescription}
      />
    </Grid.Col>
    <Grid.Col span={{ base: 12, md: createForm ? 12 : 6 }}>
      <Select label='Priority' data={priorityOptions} value={priority} />
    </Grid.Col>
    {!createForm && <Grid.Col span={{ base: 12, md: 6 }}>
      <Select label='Status' data={statusOptions} value={status} />
    </Grid.Col>}
  </Grid>
}