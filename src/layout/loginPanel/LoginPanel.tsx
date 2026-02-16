import { Button, Checkbox, Form, Input, type FormProps } from 'antd'
import { useLogin } from '../../hooks/auth/useLogin'
import styles from './loginPanel.module.scss'
import { Link } from '@tanstack/react-router'

type FieldType = {
  email: string
  password: string
  remember?: boolean
}

export const LoginPanel = () => {
  const login = useLogin()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login.mutate({
      email: values.email,
      password: values.password,
      remember: values.remember,
    })
  }

  return (
    <div className={styles.formContainer}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Podaj adres email' },
            { type: 'email', message: 'Podaj prawidłowy adres email' },
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

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Nie wylogowuj</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={login.isPending}>
            Zaloguj
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <span>
            Nie masz konta? <Link to="/register">Zarejestruj się</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  )
}
