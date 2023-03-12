import React, { useEffect} from 'react';

import "./Modal.css"
    

export function Modal({setShowModal, component, actionButtonAction, actionButtonLabel}) {

  useEffect(() => {
    document.querySelector('.modal').classList.add('show');
  }, []);

  
  const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        setShowModal(false)
        document.querySelector('.modal').classList.remove('show');
    }
  }

  const handleActionButtonClick = () => {
    actionButtonAction();
    setShowModal(false);
  }

  return (
    <>
    <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal">
          {component}

          <div className="modal-buttons">
            <div className="modal-button" onClick={() => setShowModal(false)}>Cancel</div>
            <div className='modal-button' onClick={handleActionButtonClick}>{actionButtonLabel}</div>
          </div>
        </div>
    </div>
    </>
  );
}