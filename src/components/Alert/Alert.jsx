import React, { useState, useEffect } from 'react';
import S from './styles.module.scss'

const Alert = ({ message, isVisible}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return visible ? (
    <div className={S.alert}>
      <div className={S.alertText}>
         {message}
      </div>
    </div>
  ) : null;
};

export default Alert;