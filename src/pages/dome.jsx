import { useState } from 'react';
import { Button } from 'antd';
import { NewInput, Tabs } from '@/components';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <NewInput></NewInput>
      <Tabs></Tabs>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
}
export default Example;
