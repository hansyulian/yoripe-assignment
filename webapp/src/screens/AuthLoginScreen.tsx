import { Card, Group, Text, Button } from "@mantine/core";
import { useState } from "react";
import { isEmail } from "../utils/isEmail";
import { useGoTo } from "../hooks/useGoTo";
import { useHotkeys } from "@mantine/hooks";
import { useAsyncHandler } from "../hooks/useAsyncHandler";
import { useLoginRequest } from "../hooks/useLoginRequest";
import { useAuth } from "../providers/AuthProvider";
import { Icon } from "../components/Icon";
import { TextInputE } from "../components/TextInputE";

export type AuthLoginScreenProps = {

}

const AuthLoginScreen = (props: AuthLoginScreenProps) => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goTo = useGoTo();
  const canLogin = isEmail(email) && password.length > 8;
  const loginRequest = useLoginRequest();
  const { loading, action } = useAsyncHandler(async () => {
    const result = await loginRequest(email, password);
    const { token } = result;
    auth.login(token);
  });

  const login = async () => {
    if (!canLogin) {
      return;
    }
    await action();
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
      <TextInputE value={email} onChangeText={setEmail} label='email' placeholder='john@doe.com' leftSection={<Icon name='at' />} />
      <TextInputE value={password} onChangeText={setPassword} type='password' label='password' leftSection={<Icon name='lock' />} />
    </Card.Section>

    <Card.Section inheritPadding mt="sm" pb="md">
      <Group >
        <Button disabled={!canLogin} onClick={login} loading={loading}>Login</Button>
        <Button variant="light" onClick={() => goTo('register')}>Register</Button>
      </Group>
    </Card.Section>
  </Card>
}

export default AuthLoginScreen;