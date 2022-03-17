import { useEffect } from 'react';

const DisableScroll = (showModal) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);
};

export default DisableScroll;
