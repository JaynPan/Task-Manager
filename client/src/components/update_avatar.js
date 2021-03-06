import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import {
  Upload, Button, Avatar, message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import UseAuth from '../utils/use_auth';

export default function UpdateAvatar() {
  const Auth = useContext(UseAuth);

  const fetchAvatar = () => {
    fetch(`/users/${Auth.user._id}/avatar`)
      .then((response) => {
        if (response.status === 200) {
          return response.blob();
        }

        throw new Error(response.statusText);
      })
      .then((images) => {
        // Then create a local URL for that image and print it
        const outside = URL.createObjectURL(images);
        Auth.setAvatar(outside);
      }).catch((e) => console.log(e));
  };

  const props = {
    name: 'avatar',
    action: '/users/me/avatar',
    accept: '.png,.jpg,.jpeg',
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        fetchAvatar();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <AvatarContainer>
      <CustomAvatar
        src={Auth.avatar}
        size={100}
      >
        {Auth.user.name && Auth.user.name.slice(0, 1)}
      </CustomAvatar>
      <div>
        <h5>User Avatar</h5>
        <Upload {...props}>
          <Button>
            <UploadOutlined />
            Upload
          </Button>
        </Upload>
        The maximum file size is 1MB
      </div>
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const CustomAvatar = styled(Avatar)`
  color: #f56a00;
  background-color: #fde3cf;
  margin-right: 20px;
  flex-shrink: 0;

  .ant-avatar-string {
    font-size: 35px;
  }
`;
