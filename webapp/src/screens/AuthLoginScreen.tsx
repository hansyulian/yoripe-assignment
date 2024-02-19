import { Card, Group, Text, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { isEmail } from "../utils/isEmail";
import { useGoTo } from "../hooks/useGoTo";
import { useHotkeys } from "@mantine/hooks";
import { useAsyncHandler } from "../hooks/useAsyncHandler";
import { useLoginRequest } from "../hooks/useLoginRequest";
import { useAuth } from "../providers/AuthProvider";
import { Icon } from "../components/Icon";

export type AuthLoginScreenProps = {

}

const AuthLoginScreen = (props: AuthLoginScreenProps) => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goTo = useGoTo();
  const canLogin = isEmail(email) && password.length > 8;
  const loginRequest = useLoginRequest();
  const [isLoading, handleLogin] = useAsyncHandler(async () => {
    const result = await loginRequest(email, password);
    const { token } = result;
    auth.login(token);
  });

  const login = async () => {
    if (!canLogin) {
      return;
    }
    await handleLogin();
  }

  useHotkeys([[
    'enter', login,
  ]]);


  return <Card withBorder shadow="sm" radius="md" >
    <Card.Section withBorder inheritPadding py="xs" miw={600}>
      <Group justify="space-between">
        <Text fw={700}>Login</Text>
      </Group>
    </Card.Section>

    <Card.Section withBorder inheritPadding py='xs'>
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label='email' placeholder='john@doe.com' leftSection={<Icon name='at' />} />
      <TextInput value={password} onChange={(e) => setPassword(e.target.value)} type='password' label='password' leftSection={<Icon name='lock' />} />
    </Card.Section>

    <Card.Section inheritPadding mt="sm" pb="md">
      <Group >
        <Button disabled={!canLogin} onClick={login} loading={isLoading}>Login</Button>
        <Button variant="light" onClick={() => goTo('register')}>Register</Button>
      </Group>
    </Card.Section>
  </Card>
}

export default AuthLoginScreen;