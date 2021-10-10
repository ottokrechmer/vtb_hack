import React, { useState } from "react";
import styles from '../main/main.module.scss'
import Arrow from '../../assets/icons/link_arrow.svg';
import '../main/antd.css';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';
import { reverse } from 'named-urls';
import paths from '../paths';
import { getFeature } from '../../services/dataset';
import useAsyncEffect from 'use-async-effect';
import Loader from '../loader';

const Feature = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useAsyncEffect(async () => {
    setLoading(true);
    const res = await getFeature();
    setData(res || []);
    setLoading(false);
  }, []);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      render: (name, item) =>
        (<>
            <div>{name}</div>
            <p className={styles.date}>{moment(item.updated_at).format('DD.MM.YYYY hh:mm')}</p></>
        ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '',
      dataIndex: 'description',
      className: styles.tdAction,
      key: 'description',
      render: (id, item) => {
        return (<div onClick={() => history.push(reverse(paths.constructor, { id: item.id, urn: item.description }))}
              className={styles.detailBtn}>Показать детализацию <img alt="->" src={Arrow} /></div>
        )
      }
        ,
    },
    {
      title: '',
      dataIndex: 'id',
      className: styles.tdAction,
      key: 'id',
      render: (id, item) =>{
       return (<div onClick={()=> window.location.href = `http://ec2-18-219-12-230.us-east-2.compute.amazonaws.com/back/api/schemas/${item.id}/download`}
              className={styles.detailBtn}>Скачать</div>
        )},
    },
  ];

  return (
    <div className={styles.main}>
      <h1>Мои фичи</h1>
      <div className={styles.mainSearchResults}>
        {!loading && <Table
          pagination={false}
          locale={{ emptyText: 'Фичи не найдены' }}
          dataSource={data}
          columns={columns} />}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Feature;
