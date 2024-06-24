import React, { useContext, createContext, useState, useEffect } from "react";
import { axios } from "../utils/axios"; // Remove the curly braces

type SubchapterData = {
  name: string;
  file?: File;
};

const SectionsContext = createContext({
  logOut:null,
  user:null,
  sections: null,
  setSections: null,
  addSection: null,
  deleteSection: null,
  updateSection: null,
  addSubchapter: null, 
  deleteSubchapter: null, 
  getPdfFile: null,
  signIn: null,
});

export const useSectionsContext = () => {
  const props = useContext(SectionsContext)
  if (!props) {
    throw new Error("Введи дані у Sections провайдер")
  }
  return props;
}

export const SectionsProvider = ({ children }) => {
  const [sections, setSections] = useState(null);
  const [user, setUser] = useState(null);

  const getSections = async () => {
    try {
      const res = await axios.get('/mainchapter/');
      //!save results into context      
      const sortedData = res.data.mainChapter.sort((a, b) => a.year - b.year);
      console.log(res.data, "data"); 
      setSections(sortedData);
    } catch (err) {
      console.error(err);
    }
  }

 const logOut = () => setUser(null)

  const getSession = async () => {
    try {
      const res = await axios.get('/auth/session');
      //!save results into context      
  
      console.log(user, "data"); 
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  }

const signIn = async (authData) =>{
  try {
    const res = await axios.post('/auth/signin', authData)

    setUser(res.data.user)
    localStorage.setItem('token', res.data.token);

    console.log(user)
  } catch (err) {
    console.log(err)
  }
  
}
   
  
  const addSection = async (newSection) => {
    try {
      const res = await axios.post('/mainchapter/', newSection);
      console.log(res.data.mainChapter);
      const updatedSections = [...sections, res.data.mainChapter];
      const sortedSections = updatedSections.sort((a, b) => a.year - b.year);
      setSections(sortedSections);
      
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSection = async (id) => {
    try {
      await axios.delete(`/mainchapter/${id}`);
      setSections(sections.filter(section => section._id !== id));
    } catch (error) {
      console.error("Помилка під час видалення розділу:", error);
    }
  };

  const updateSection = async (id, newData) => {
    try {
      await axios.post(`/mainchapter/update/${id}`, newData);
      console.log(newData)
      getSections();
    } catch (error) {
      console.error("Помилка при оновленні розділу:", error);
    }
  };

  const addSubchapter = async (sectionId, title, file) => {
    const formData = new FormData();
    formData.append("name", title);
    if (file) {
      formData.append("file", file);
    }
  
    try {
      const res = await axios.post(
        `/upload-files/${sectionId}`, // Correct the route here
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
  
      setSections(prevSections =>
        prevSections.map(section =>
          section._id === sectionId
            ? { ...section, subchapter: [...section.subchapter, res.data.subchapter] }
            : section
        )
      );
    } catch (error) {
      console.error("Помилка завантаження файлу:", error);
    }
  };

  const deleteSubchapter = async (sectionId, subchapterId) => {
    try {
      await axios.post(`/mainchapter/deleteSubChapter/${sectionId}/${subchapterId}`);
      setSections(prevSections =>
        prevSections.map(section =>
          section._id === sectionId
            ? { ...section, subchapter: section.subchapter.filter(sub => sub._id !== subchapterId) }
            : section
        )
      );
    } catch (error) {
      console.error("Помилка при видаленні підрозділу:", error);
    }
  };

  
  
  

  const getPdfFile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/files');
      //!save results into context      
      setSections(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSections();
    getSession();
  }, []);

  

  return (
    <SectionsContext.Provider value={{
      sections, setSections, addSection, deleteSection, updateSection, addSubchapter, deleteSubchapter, getPdfFile, user, logOut, signIn
    }}>
      {children}
    </SectionsContext.Provider>
  );
};