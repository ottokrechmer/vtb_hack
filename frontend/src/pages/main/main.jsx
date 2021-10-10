import React, { useState } from "react";
import styles from './main.module.scss'
import Close from './../../assets/icons/privateClose.svg';
import Open from './../../assets/icons/privateOpen.svg';
import Settings from './../../assets/icons/settings.svg';
import Arrow from './../../assets/icons/link_arrow.svg';
import Filter from './../../assets/icons/filter.svg';
import './antd.css';
import { useLocation, useHistory } from 'react-router-dom';
import { Checkbox, Input, Table } from 'antd';
import moment from 'moment';
import { reverse } from 'named-urls';
import paths from '../paths';
import { getDataSets, updateDataset } from '../../services/dataset';
import useAsyncEffect from 'use-async-effect';
import Loader from '../loader';
import classNames from 'classnames';
import ModalSettings from './modal';

const { Search } = Input;

const defaultParams = { search: '', is_mine: null, is_purchased: null };

const MainPage = () => {
  const location = useLocation();
  const isMy = (location.pathname === paths.myDatasets);
  const [requestParams, setRequestParams] = useState({ ...defaultParams });
  const [choseItem, setChoseItem] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const history = useHistory();
  const isToken = !!localStorage.getItem('token');
  const [settingsData, setSettingsData] = useState(null);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  useAsyncEffect(async () => {
    setLoading(true);
    const res = (isMy) ? await getDataSets({ ...requestParams, is_mine: true }) : await getDataSets(
      requestParams);
    setData(res || []);
    setLoading(false);
  }, [requestParams]);

  const columns = [
    {
      title: '',
      dataIndex: 'isChecked',
      key: 'isChecked',
      width: '30px',
      render: (isChecked) => {
        if (isChecked)
          return <div className={styles.circle} />
      },
    },
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
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) =>
        (<div>{price || 'Free'}</div>),
    },
    {
      title: '',
      dataIndex: 'id',
      className: styles.tdAction,
      key: 'action',
      render: (id) =>
        (<div onClick={() => history.push(reverse(paths.details, { id }))}
              className={styles.detailBtn}>Показать детализацию <img alt="->" src={Arrow} /></div>
        ),
    },
  ];

  const columnMy = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) =>
        (<div>{price || 'Free'}</div>),
    },
    {
      title: '',
      dataIndex: 'id',
      key: '',
      render: (id) =>
        (<div onClick={() => history.push(reverse(paths.details, { id }))}
              className={styles.detailBtn}>Показать детализацию <img alt="->" src={Arrow} /></div>
        ),
    },
    {
      title: '',
      dataIndex: 'is_private',
      key: 'is_private',
      width: '20px',
      className: styles.tdAction,
      render: (is_private) => {
        console.log(is_private);
          return  <img alt='isPrivate' src={is_private ? Open : Close} />
      },
    },
    {
      title: '',
      dataIndex: 'settings',
      className: styles.tdAction,
      key: 'name',
      width: '20px',
      render: (index, item) => <img onClick={() => {
        const selectData = data.filter((elem) => item.id === elem.id );
        setSettingsData(selectData[0]);
        setIsOpenSettings(true)}} className={styles.tdSettings} alt='isPrivate' src={Settings} />
    },]

  const updateData = async (item) => {
    setSettingsData({...item});
    const res = await updateDataset(item);
    if(res)
      setData(data.map((elem) => ( (elem.id ===item.id) ? {...item} : elem )));
  }

  const onRowClickHandler = (index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        setChoseItem({ id: item.id, price: item.price });
      }
      return ({ ...item, isChecked: (i === index) })
    });
    setData(newData);
  };

  const onSearch = (e) => {
    if (e.target.value.length > 2 || !e.target.value.length)
      setRequestParams({ ...requestParams, name: e.target.value })
  };

  const setVisiblyFilter = () => {
    if (showFilters)
      setRequestParams({ ...requestParams, is_mine: null, is_purchased: null })
    setShowFilters(!showFilters);
  }

  const setFilters = (e) => {
    const { name, value } = e.target;
    setRequestParams({
      ...requestParams,
      [name]: !value,
    });
  }
  return (
    <div className={styles.main}>
      <h1>{isMy ? 'Мои Датасеты' : 'Датасеты'}</h1>
      <div className={styles.searchPanel}>
        <Search
          className={styles.search}
          placeholder="Поиск по названию, тикеру"
          onChange={onSearch}
        />
        {!isMy && isToken && <button onClick={setVisiblyFilter}><img alt="-"
                                                                     src={Filter} /><span>Фильтры</span>
        </button>}
      </div>
      {showFilters && <div className={styles.filters}>
        <p className={styles.checkbox}>Показать мои датасеты <Checkbox value={requestParams.is_mine}
                                                                       name="is_mine"
                                                                       onChange={setFilters} /></p>
        <p className={styles.checkbox}>Показать купленные датасеты <Checkbox
          value={requestParams.is_purchased}
          name="is_purchased" onChange={setFilters} /></p>
      </div>}
      {isMy && <ModalSettings
        setSettings={updateData}
        settingsData={settingsData}
        isOpenSettings={isOpenSettings}
        setIsOpenSettings={setIsOpenSettings}/>}
      <div className={styles.mainSearchResults}>
        {!loading && <Table
          className={classNames({
            [styles.isMy]: isMy,
          })}
          pagination={false}
          onRow={(record, index) => ({
            index,
            onClick: (e) => {if (!isMy) onRowClickHandler(index)},
          })}
          locale={{ emptyText: 'Датасеты не найдены' }}
          dataSource={data}
          columns={isMy ? columnMy : columns} />}
        {loading && <Loader />}
      </div>
      <div className={styles.footer}>
        {isToken &&  !isMy && <button disabled={!choseItem?.id || !choseItem?.price}
                            onClick={() => history.push(`/constructor/${choseItem.id}`)}>Купить
        </button>}
        {isToken && isMy && <button
                            onClick={() => {/* открыть модалку*/}}>Загрузить
        </button>}
        {isToken && isMy && <button
                            onClick={() => history.push(`/details/new`)}>Создать
        </button>}
        {!isMy && isToken && <button  disabled={!choseItem?.id}
                                     onClick={() => history.push(`/constructor/${choseItem.id}/new`)}>Создать
          фичу
        </button>}
      </div>
    </div>
  );
};

export default MainPage;
