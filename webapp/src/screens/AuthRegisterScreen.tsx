import { Card, Group, Button, Text } from "@mantine/core";
import { Icon } from "../components/Icon";
import { TextInputE } from "../components/TextInputE";
import { useState } from "react";
import { useGoTo } from "../hooks/useGoTo";
import { useAsyncHandler } from "../hooks/useAsyncHandler";
import { isEmail } from "../utils/isEmail";
import { useHotkeys } from "@mantine/hooks";
import { useRegisterRequest } from "../hooks/useRegisterRequest";
import { useToast } from "../hooks/useToast";

export type AuthRegisterScreenProps = {

}

const AuthRegisterScreen = (props: AuthRegisterScreenProps) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goTo = useGoTo();
  const toast = useToast();
  const canRegister = fullname.length > 0 && isEmail(email) && password.length > 8;
  const registerRequest = useRegisterRequest();
  const [isLoading, handleRegister] = useAsyncHandler(async () => {
    await registerRequest(fullname, email, password);
    toast.success('Register success');
    return goTo('login');
  });


  const register = async () => {
    if (!canRegister) {
      return;
    }
    await handleRegister();
  }

  useHotkeys([[
    'enter', register,
  ]]);

  return <Card withBorder shadow="sm" radius="md" >
    <Card.Section withBorder inheritPadding py="xs" miw={600}>
      <Group justify="space-between">
        <Text fw={700}>Register</Text>
      </Group>
    </Card.Section>

    <Card.Section withBorder inheritPadding py='xs'>
      <TextInputE value={fullname} onChangeText={setFullname} label='Full name' placeholder='John Doe' leftSection={<Icon name='user' />} />
      <TextInputE value={email} onChangeText={setEmail} label='email' placeholder='john@doe.com' leftSection={<Icon name='at' />} />
      <TextInputE value={password} onChangeText={setPassword} type='password' label='password' leftSection={<Icon name='lock' />} />
    </Card.Section>

    <Card.Section inheritPadding mt="sm" pb="md">
      <Group >
        <Button disabled={!canRegister} onClick={register} loading={isLoading}>Register</Button>
        <Button variant="light" onClick={() => goTo('login')}>Login</Button>
      </Group>
    </Card.Section>
  </Card>
}

export default AuthRegisterScreen;