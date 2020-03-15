import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import UseAuth from '../utils/use_auth';

const { confirm } = Modal;

export default function DeleteUser() {
  const Auth = useContext(UseAuth);

  const handleDelete = async () => {
    try {
      const res = await fetch('/users/me', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });

      if (res.status === 200) {
        message.success('Account has been deleted sucessfully！', 5);
        Auth.setAuth(false);
      } else {
        message.error(res.statusText);
      }
    } catch (e) {
      message.success('Something went wrong!');
    }
  };

  function showConfirm() {
    confirm({
      title: 'Are you sure delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'It is not reversible after delete the account.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return handleDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <div>
      <Button type="primary" danger onClick={showConfirm}>Delete Account</Button>
    </div>
  );
}
