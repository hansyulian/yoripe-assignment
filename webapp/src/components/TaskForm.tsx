import { useEffect, useState } from "react";
import { TextInputE } from "./TextInputE";
import { TextAreaE } from "./TextAreaE";
import { Button, Grid, Select } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import classes from './TaskForm.module.scss';
import { Icon } from "./Icon";

export type TaskFormProps = {
  data?: TaskForm;
  createForm?: boolean;
  onSave?: (data: TaskForm) => void;
  loading?: boolean;
}

const priorityOptions = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
const statusOptions = ['PENDING', 'COMPLETED', 'DELETE'];

export const TaskForm = (props: TaskFormProps) => {
  const { createForm, data, onSave, loading } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('NORMAL');
  const [status, setStatus] = useState<TaskStatus>('PENDING');
  const canSave = !!title.length && !!description.length;

  const save = () => {
    if (!canSave) {
      return;
    }
    onSave?.({
      title,
      description,
      priority,
      status,
    });
  }

  useHotkeys([[
    'enter', save,
  ]]);


  useEffect(() => {
    setTitle(data?.title || '');
    setDescription(data?.description || '');
    setPriority(data?.priority || 'NORMAL');
    setStatus(data?.status || 'PENDING');
  }, [data]);

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
      <Select label='Priority' data={priorityOptions} value={priority} onChange={(value) => setPriority(value as TaskPriority)} />
    </Grid.Col>
    {!createForm && <Grid.Col span={{ base: 12, md: 6 }}>
      <Select label='Status' data={statusOptions} value={status} onChange={(value) => setPriority(value as TaskPriority)} />
    </Grid.Col>}

    <Grid.Col className={classes.buttonsContainer}>
      <Button onClick={save} disabled={!canSave} loading={loading} leftSection={<Icon name='save' />}>Save</Button>
    </Grid.Col>
  </Grid>
}