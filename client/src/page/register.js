import React, { useState } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import {
  UserOutlined, LockOutlined, MailOutlined, HeartOutlined,
} from '@ant-design/icons';
import isEmail from 'validator/lib/isEmail';

import FixedForm from '../styled-components/fixed_form';
import ErrMsg from '../styled-components/err_msg';

export default function Register(props) {
  const [errMsg, setErrMsg] = useState('');

  const isValid = (values) => {
    if (!isEmail(values.email)) {
      setErrMsg('Invalid Email Address');
      return false;
    }

    if (values.age && values.age <= 0) {
      setErrMsg('Age must be a positive number');
      return false;
    }

    if (values.password.length < 6) {
      setErrMsg('Password shorter than the minimum allowed length (6)');
      return false;
    }

    if (values.password === 'password') {
      setErrMsg('Password cannot contain "password"');
      return false;
    }

    return true;
  };

  const onFinish = async (values) => {
    if (!isValid(values)) {
      return false;
    }

    try {
      const res = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        message.success('Email has been sent, kindly activate your account', 5);
        return props.history.push('/activate');
      }

      if (res.status === 400) {
        const data = await res.json();
        return setErrMsg(data.error);
      }
      return setErrMsg('somthing went wrong! try again later.');
    } catch (e) {
      return setErrMsg(`Something went wrong! ${e}`);
    }
  };

  const onFieldsChange = () => {
    if (errMsg.length !== 0) {
      setErrMsg('');
    }
  };

  return (
    <FixedForm>
      <h2 style={{ paddingBottom: '1em' }}>Task Manager Register</h2>
      {errMsg.length !== 0 && <ErrMsg className="error">{errMsg}</ErrMsg>}

      <Form
        name="register-form"
        className="register-form"
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item name="age">
          <Input
            prefix={<HeartOutlined className="site-form-item-icon" />}
            placeholder="Age (not required)"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </FixedForm>
  );
}
