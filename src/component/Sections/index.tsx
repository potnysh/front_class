import './style.css';
import { IconContext } from "react-icons";
import { GiCastle, GiSaintBasilCathedral, GiWhiteTower } from "react-icons/gi";
import Subparagraph from '../Subparagraph';
import React, { useState } from 'react';
import { axios } from "../../utils/axios";
import { useSectionsContext } from '../SectionProvider';
import AddSubparagraphModal from '../AddSubparagraphModal';
import { IoAdd, IoEllipsisVertical } from 'react-icons/io5';
import { FaMonument } from 'react-icons/fa6';
import { BiSolidCastle } from 'react-icons/bi';
import { LuTent } from 'react-icons/lu';
import EditSectionModal from '../EditSectionModal';

interface Sections {
    openSub: boolean;
}
 
function Sections() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);

    const closeEditModal = () => {
      setEditOpen(false);
  }
    const closeModal = () => {
        setOpen(false);
    }


    
    const icons = [
      { component: FaMonument, id: 1 },
      { component: GiWhiteTower, id: 2 },
      { component: BiSolidCastle, id: 3 },
      { component: GiSaintBasilCathedral, id: 4 },
      { component: LuTent, id: 5 }
    ];
    
    const { sections, setSections, deleteSection } = useSectionsContext();

    console.log(sections);
    const [openSections, setOpenSections] = useState({});
    if (!sections) {
        return <div>loading...</div>
    }

    const toggleOpen = (id) => {
      setOpenSections(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    };

    const getIconComponent = (id) => {
      const icon = icons.find(icon => icon.id === id);
      return icon ? icon.component : GiCastle; // Default icon if not found
    };

    const handleMenuToggle = (id) => {
      setMenuOpen(menuOpen === id ? null : id);
    };

	return (
		<div className="sections">
      {sections.map(section => (
        <div key={section._id} className="section">
          <div className='chapter'>
            <button className='chapterButton' onClick={() => toggleOpen(section._id)}>
              <div className='chapter_icon'>
                <IconContext.Provider value={{ size: "3.5em" }}>
                  <div className={`chapter_icon_box ${openSections[section._id] ? 'active' : ''}`}>
                    {React.createElement(getIconComponent(section.icon))}
                  </div>
                </IconContext.Provider>
              </div>
              <div className='text_chapter'>
                <p>{section.name}</p>
                <p>{section.year}</p>
              </div>
                <div className='menu_icon' onClick={(e) => e.stopPropagation()}>
              <div onClick={() => handleMenuToggle(section._id)}>
                <IoEllipsisVertical size={35} />
              </div>
              {menuOpen === section._id && (
                <div className='menu'>
                  <div className='edit_button' onClick={() => setEditOpen(!editOpen)}>Редагувати</div>
                  <EditSectionModal closeEditModal={closeEditModal} editOpen={editOpen} sectionId={section._id} />  
                  <div className='delete_button' onClick={() => deleteSection(section._id)}>Видалити</div>
                </div>
              )}
            </div>
            </button>
          
          </div>
          <div className={`add_subparagraph_box ${openSections[section._id] ? '' : 'openButton'}`}>
          <button className='add_subparagraph' onClick={() => setOpen(!open)}>
              <IconContext.Provider value={{ className: "add_icon" }}>
                <div>
                  <IoAdd />
                </div>
              </IconContext.Provider>
            </button>
            <AddSubparagraphModal closeModal={closeModal} open={open} sectionId={section._id} />
           <Subparagraph openSub={openSections[section._id]} subchapters={section.subchapter} sectionId={section._id} key={section._id} />
          </div>
        </div>
      ))}
    </div>
	);
}

export default Sections;
