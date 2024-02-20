import { Textarea, TextareaProps } from "@mantine/core";
import { ChangeEventHandler } from "react";


export type TextAreaEProps = TextareaProps & {
  onChangeText?: (value: string) => void;
}

export const TextAreaE = (props: TextAreaEProps) => {
  const { onChangeText, onChange, ...rest } = props;

  const onChangeExtended: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange?.(e);
    onChangeText?.(e.target.value);
  }

  return <Textarea
    {...rest}
    onChange={onChangeExtended}
  />
}