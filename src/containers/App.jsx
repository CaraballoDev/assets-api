import React, { useEffect, useState } from 'react';
import '../assets/styles/style.css';

const Asset = (props) => {
  const { url } = props;
  return <img className='item' src={`/src/assets/static/${url}`} />;
};

const App = (props) => {
  const [imgUrlsList, setImgUrlList] = useState([]);

  const fetchImagesUrls = async () => {
    try {
      const res = await fetch('http://localhost:3000/assets');
      const data = await res.json();
      setImgUrlList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImagesUrls();
  }, []);

  console.log(imgUrlsList.length);
  return (
    <>
      <form name='form' encType='multipart/form-data'>
        <input type='file' name='file' />
        <br />
        <input type='submit' value='enviar' />
      </form>
      <section className='container'>
        {imgUrlsList.map((url, i) => {
          return <Asset key={url} url={url} />;
        })}
      </section>
    </>
  );
};

export default App;
