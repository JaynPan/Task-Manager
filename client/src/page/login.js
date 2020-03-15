import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import FixedForm from '../styled-components/fixed_form';
import ErrMsg from '../styled-components/err_msg';
import UseAuth from '../utils/use_auth';

export default function Login() {
  const Auth = useContext(UseAuth);
  const [errMsg, setErrMsg] = useState('');

  const onFinish = async (values) => {
    try {
      const res = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        Auth.setAuth(true);

        const json = await res.json();

        Cookies.set('access_token', json.token, { sameSite: 'strict' });
        Auth.setUser(json.user);
      } else {
        setErrMsg('Incorrect email or password!');
      }
    } catch (e) {
      setErrMsg(`Something went wrong! ${e}`);
    }
  };

  const onFieldsChange = () => {
    if (errMsg.length !== 0) {
      setErrMsg('');
    }
  };

  return (
    <FixedForm>
      <h2 style={{ paddingBottom: '1em' }}>Task Manager</h2>
      {errMsg.length !== 0 && <ErrMsg className="error">{errMsg}</ErrMsg>}

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {' Or '}
        </Form.Item>
      </Form>
    </FixedForm>
  );
}
