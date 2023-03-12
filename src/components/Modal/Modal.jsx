import React, { useEffect} from 'react';

import "./Modal.css"
    

export function Modal({setShowModal, component, action}) {

  useEffect(() => {
    document.querySelector('.modal').classList.add('show');
  }, []);

  
  const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        setShowModal(false)
        document.querySelector('.modal').classList.remove('show');
    }
  }

  return (
    <>
    <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal">
        {component}

        <div className="modal-close-button" onClick={() => setShowModal(false)}>Cancel</div>
        <div className='modal-action-button'>Action button</div>
        </div>
    </div>
    </>
  );
}