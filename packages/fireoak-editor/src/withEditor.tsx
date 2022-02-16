import {FunctionComponent, useEffect, useState, useCallback} from 'react';
import {Modal} from '@mantine/core';
import {initFirebase} from './firebase.client';
import {Editor} from './components/Editor';

function useKeyPress(keyCode: string, callback: () => void): void {
  const handler = (e: KeyboardEvent) => {
    if (keyCode.startsWith('ctrl+')) {
      if (e.ctrlKey && e.key === keyCode.slice(5)) {
        callback();
      }
    } else if (e.key === keyCode) {
      callback();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}

export function withEditor<P = {}>(
  ChildComponent: FunctionComponent<P>,
  {docId, schema}: {docId: string, schema: any}
) {
  initFirebase();
  function EditorComponent(props: P & {initialData: any}) {
    const [data, setData] = useState(props.initialData || {});
    const [editorEnabled, setEditorEnabled] = useState(false);
    useKeyPress('ctrl+e', useCallback(() => {
      setEditorEnabled((enabled) => !enabled);
    }, []));
    return (
      <>
        <ChildComponent data={data} {...props} />
        <Modal
          opened={editorEnabled}
          onClose={() => setEditorEnabled(false)}
          title={docId}
          transition="slide-right"
          size="lg"
          styles={{
            inner: {
              justifyContent: 'flex-start',
              padding: '16px',
            },
            modal: {
              minHeight: '100%',
            },
          }}
        >
          <Editor
            docId={docId}
            schema={schema}
            initialData={props.initialData || {}}
            onChange={(newData) => setData(newData)}
          />
        </Modal>
      </>
    );
  }
  return EditorComponent;
}
