import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Input, type FormProps } from 'antd'
import { useRegister } from '../hooks/auth/register'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

type FieldType = {
  email: string
  username: string
  password: string
}

function RouteComponent() {
  const register = useRegister()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    register.mutate(
      {
        email: values.email,
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: () => {
          console.log('Użytkownik utworzony')
        },
        onError: (err) => {
          console.error('Błąd:', err.message)
        },
      }
    )
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Podaj adres e-mail' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Podaj nazwę użytkownika' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Podaj hasło' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
