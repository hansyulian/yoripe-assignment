import { TextInput, TextInputProps } from "@mantine/core";
import { ChangeEventHandler } from "react";


export type TextInputEProps = TextInputProps & {
  onChangeText: (value: string) => void;
}

export const TextInputE = (props: TextInputEProps) => {
  const { onChangeText, onChange, ...rest } = props;

  const onChangeExtended: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    onChangeText?.(e.target.value);
  }

  return <TextInput
    {...rest}
    onChange={onChangeExtended}
  />
}