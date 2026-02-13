import { createFileRoute } from '@tanstack/react-router'
import { Button, Checkbox, Form, Input, type FormProps } from 'antd'
import { useLogin } from '../hooks/auth/login'
import { router } from '../app/router'

type FieldType = {
  email: string
  password: string
  remember?: string
}

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const login = useLogin()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          console.log(data)
          if (values.remember) {
            localStorage.setItem('token', data.token)
          }
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
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

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Nie wylogowuj</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Zaloguj
        </Button>
      </Form.Item>
    </Form>
  )
}
