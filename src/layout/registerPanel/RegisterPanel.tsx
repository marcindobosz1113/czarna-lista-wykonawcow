import { Button, Form, Input, type FormProps } from 'antd'
import { useRegister } from '../../hooks/auth/useRegister'
import styles from './registerPanel.module.scss'
import { Link } from '@tanstack/react-router'

type FieldType = {
  email: string
  username: string
  password: string
  repeatPassword: string
}

export const RegisterPanel = () => {
  const register = useRegister()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    register.mutate({
      email: values.email,
      username: values.username,
      password: values.password,
    })
  }

  return (
    <div className={styles.formContainer}>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        wrapperCol={{ span: 24 }}
        className={styles.form}
      >
        <Form.Item<FieldType>
          layout="vertical"
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
          layout="vertical"
          label="Nazwa użytkownika"
          name="username"
          rules={[
            { required: true, message: 'Podaj nazwę użytkownika' },
            {
              min: 3,
              message: 'Nazwa użytkownika jest za krótka, min. 3 znaki',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          layout="vertical"
          label="Hasło"
          name="password"
          rules={[
            { required: true, message: 'Podaj hasło' },
            {
              min: 8,
              message: 'Hasło musi mieć conajmniej 8 znaków',
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/,
              message:
                'Hasło musi zawierać jedną dużą literę i jeden znak specjalny',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          layout="vertical"
          label="Powtórz hasło"
          name="repeatPassword"
          rules={[
            { required: true, message: 'Podaj hasło' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Hasła muszą być takie same')
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={register.isPending}>
            Zarejestruj
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <span>
            Masz już konto? <Link to="/login">Zaloguj się</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  )
}
