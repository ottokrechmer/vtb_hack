import React from 'react';
import styles from './styles.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <LoadingOutlined />
    </div>
  </div>
);

export default React.memo(Loader);
