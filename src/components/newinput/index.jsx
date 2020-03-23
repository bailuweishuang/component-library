import { Input } from 'antd';

function NewInput(props) {
  const { placeholder, ...moreProps } = props;
  return <Input {...moreProps} placeholder="nihao"/>;
}
export default NewInput;
