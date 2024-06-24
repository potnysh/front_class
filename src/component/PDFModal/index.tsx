import React, { useState } from 'react';
import './style.css';
import { Document, Page } from 'react-pdf'; 

const PDFModal = ({ open, closeModal, selectedPdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleCloseModal = () => {
    setPageNumber(1);
    setNumPages(null); 
    closeModal();     
  };

  if (!open) return null;

  return (
    <div className="modal-container" onClick={handleCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ width: '600px', height: '800px' }}> 
        {selectedPdf && (
          <Document
          
            file={selectedPdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page width={600} height={800} pageNumber={pageNumber} />
          </Document>
        )}
        </div>
        <div className="pagination">
           
          <button className='rout_button' onClick={goToPreviousPage} disabled={pageNumber === 1}>Попередня</button>
          <p style={{width:"250px"}}>Сторінка {pageNumber} з {numPages}</p>
          <button className='rout_button' onClick={goToNextPage} disabled={pageNumber === numPages}>Наступна</button>
         
          
        </div>
      </div>
    </div>
  );
};

export default PDFModal;