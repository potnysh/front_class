import React, { useState } from 'react';
import './style.css';
import { useSectionsContext } from '../SectionProvider';

const AddSubparagraphModal = ({ open, closeModal, sectionId }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { addSubchapter } = useSectionsContext();

  const submitImage = async (e) => {
    e.preventDefault();
    await addSubchapter(sectionId, title, file);
    alert("Uploaded Successfully!!!");
    closeModal(); // Закриваємо модальне вікно після успішного завантаження
  };

  if (!open) return null;

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submitImage}>
          <h1>Створення нового підрозділу</h1>
          <div className='inputs'>
            <input
              type="text"
              placeholder='*Назва'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='buttons'>
            <input
              type='file'
              accept='application/pdf'
              id='add_pdf_button'
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <label htmlFor="add_pdf_button">Виберіть файл</label>
            <p>{file && file.name}</p>
            <button className='accept_pdf_button' type='submit'>
              Додати файл
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubparagraphModal;