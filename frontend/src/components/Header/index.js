import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Space} from 'antd';
// import { BellOutlined, DownOutlined } from '@ant-design/icons';


import useLocalData from '../../core/hook/useLocalData';
// import cookie from '../../core/helpers/cookie';

// import './style.css';

export default function Header() {
  const { store, dispatch } = useLocalData();
  const { headerTitle, userData } = store || {};
  const sidebar = store?.layout?.sidebar || {};
//   const navigate = useNavigate();

  return (
    <Layout.Header className={`${sidebar.compact ? 'compact' : ''}`}>
      <Row align="middle" justify="space-between">
        <Col>
          <Space className="title-wrapper" size={20} direction="horizontal">
            <div className="d-flex">
              <h1 className="title mt-3">
                {headerTitle || ''}
              </h1>
            </div>
          </Space>
        </Col>
      </Row>
    </Layout.Header >
  );
}
