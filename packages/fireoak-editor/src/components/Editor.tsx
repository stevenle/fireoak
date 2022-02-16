import {Input, InputWrapper, TextInput} from '@mantine/core';
import {useState} from 'react';

export interface EditorProps {
  docId: string;
  schema: any;
  initialData: any;
  onChange?: (newData: any) => void;
}

export function Editor(props: EditorProps) {
  const [data, setData] = useState(props.initialData || {});
  const onTitleChange = (newTitle: string) => {
    console.log(newTitle);
    const newData = {meta: {title: newTitle}};
    setData(newData);
    if (props.onChange) {
      props.onChange(newData);
    }
  };


  return (
    <>
      <TextInput
        label="Title"
        description="Meta title for the page."
        value={data.meta?.title || ''}
        placeholder="Title"
        onChange={(e) => onTitleChange(e.currentTarget.value)}
      />
    </>
  );
}
