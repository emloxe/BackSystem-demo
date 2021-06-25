import { Result, Button } from 'antd';

export default function User(props) {


  return (
    <Result
    status="404"
    title="页面不存在"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
  );
}
