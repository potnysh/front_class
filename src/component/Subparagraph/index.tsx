import './style.css';
import React, { useState, useEffect } from 'react';
import { LuScrollText } from 'react-icons/lu';
import { IconContext } from 'react-icons';
import PDFModal from '../PDFModal';
import { useSectionsContext } from '../SectionProvider';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { IoEllipsisVertical } from 'react-icons/io5';
import Sections from '../Sections';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Subparagraph = ({ openSub, subchapters, sectionId}) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSubchapter, setEditSubchapter] = useState(null);
  const { deleteSubchapter, user } = useSectionsContext();

  const handleDelete = (sectionId, subchapterId) => {
    deleteSubchapter(sectionId, subchapterId);
  };

  const handleEdit = (sectionId, subchapter) => {
    setIsEditing(true);
    setEditSubchapter(subchapter);
  };

  const handleEditSubmit = (subchapterId, newData) => {
    setIsEditing(false);
    setEditSubchapter(null);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      if (!selectedPdf) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/files/${selectedPdf}`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        setSelectedPdf(url);
      } catch (error) {
        console.error("Помилка при завантаженні PDF:", error);
      }
    };

    fetchPdf();
  }, [selectedPdf]);

  const handleMenuToggle = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };


  return (
    <div className="subparagraph">
      {subchapters.map((subchapter) => (
        
          <button className="subparagraph_button" key={subchapter._id} onClick={() => setSelectedPdf(subchapter.pdfUrl)}>
            <div className="subparagraph_icon">
              <IconContext.Provider value={{ size: '4em' }}>
                <div className="subparagraph_icon_box">
                  <LuScrollText />
                </div>
              </IconContext.Provider>
            </div>
            <div className="text_subparagraph">
              <p>{subchapter.name}</p>
            </div>

            {user?.status === "admin" && (
            <div className="menu_icon" onClick={(e) => e.stopPropagation()}>
            <div onClick={() => handleMenuToggle(subchapter._id)}>
              <IoEllipsisVertical size={35} />
            </div>
            {menuOpen === subchapter._id && (
            
              <div className="menu">
                <div className="delete_button" onClick={() => handleDelete(sectionId, subchapter._id)}>Видалити</div>
              </div>
            )}

          </div>
            )}
          </button>
          

      ))}
      <PDFModal selectedPdf={selectedPdf} open={selectedPdf !== null} closeModal={() => setSelectedPdf(null)} />
    </div>
  );
};

export default Subparagraph;