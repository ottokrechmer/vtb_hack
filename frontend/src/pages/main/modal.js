import React, { useEffect, useState } from "react";
import styles from './main.module.scss';
import { Input, Modal, Switch } from 'antd';

const ModalSettings = ({  setSettings,
                         settingsData,
                         isOpenSettings,
                         setIsOpenSettings, ...props }) => {
  const [data, setData] =useState({...settingsData});



  const onChange = (e) => {
    if(typeof e === 'boolean') {
      setData({...data, is_private: e});
    }
    else {
      const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
  };

  useEffect(() => {
    setData(settingsData);
  },[settingsData])

  return (
    <Modal visible={isOpenSettings} onCancel={() => setIsOpenSettings(false)}>
      <div className={styles.settingsContainer}>
        <div><span>Приватный</span>
        <Switch value={data?.is_private} onChange={onChange}/>
        </div>
        <div className={styles.input}><span>Цена</span><Input
       name='price' value={data?.price} onChange={onChange}/></div>
        <button className={styles.button} onClick={() => {
          setIsOpenSettings(false);
          setSettings(data);}}>Применить</button>
      </div>
    </Modal>
  );
};

export default ModalSettings;
