import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Input, type FormProps } from 'antd'
import { useRegister } from '../hooks/auth/register'
import { router } from '../app/router'

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
          router.navigate({ to: '/' })
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Podaj adres e-mail' },
          {
            type: 'email',
            message: 'Podaj prawidłowy adres email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Nazwa użytkownika"
        name="username"
        rules={[
          { required: true, message: 'Podaj nazwę użytkownika' },
          {
            min: 3,
            message: 'Nazwa użytkownika jest za krótka',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Hasło"
        name="password"
        rules={[{ required: true, message: 'Podaj hasło' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={register.isPending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
