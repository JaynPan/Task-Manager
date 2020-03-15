import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import {
  Form, Input, Button, message,
} from 'antd';
import {
  UserOutlined, LockOutlined, MailOutlined, HeartOutlined,
} from '@ant-design/icons';

import UseAuth from '../utils/use_auth';
import ErrMsg from '../styled-components/err_msg';

export default function UpdateUser() {
  const Auth = useContext(UseAuth);
  const [errMsg, setErrMsg] = useState('');

  const onFinish = async (values) => {
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const payload = JSON.parse(JSON.stringify(values));

    allowUpdates.forEach((update) => {
      if (typeof payload[update] !== 'undefined' && payload[update].trim().length !== 0) {
        return;
      }
      delete payload[update];
    });

    try {
      const res = await fetch('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });
      const json = await res.json();

      if (res.status === 200) {
        message.success('Update sucessfully！');
        Auth.setUser(json);
      } else {
        setErrMsg(json.error);
      }
    } catch (e) {
      setErrMsg('Somthing went wrong!');
    }
  };

  const onFieldsChange = () => {
    if (errMsg.length !== 0) {
      setErrMsg('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      {errMsg.length !== 0 && <ErrMsg>{errMsg}</ErrMsg>}
      <Form
        name="register-form"
        className="register-form"
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item name="name">
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item name="age">
          <Input
            prefix={<HeartOutlined className="site-form-item-icon" />}
            placeholder="Age (not required)"
          />
        </Form.Item>
        <Form.Item name="email">
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
