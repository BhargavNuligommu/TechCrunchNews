import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from "html-react-parser";
import { BeatLoader } from 'react-spinners';


const NewsList = () => {
  const [state, setArticles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
        const data = await axios.get(
          `https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed`
        );
        setArticles(data.data);
        setIsLoading(false);
      })()
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (loading) {
    return (
        <div className="loader">
          <BeatLoader color={'#123abc'} loading={loading} size={20} />
        </div>
      );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="heading">New Articles</h2>
      <div className="App">
        {loading && <span class="loader"></span>}
        {!loading &&
          (state?.length > 0 ? (
            state?.map((blog) => (
              <a className="link" href={blog.canonical_url} target="_blank" rel="noreferrer">
                <div class="card">
                  <div className="flex flex-direction justify-content-start align-items-center">
                    <div>
                      <img
                        src={blog.jetpack_featured_media_url}
                        className="image"
                        alt="img"
                      />
                    </div>
                    <div className="flex flex-direction-column justify-content-start">
                      <div class="text">
                        <h2>{parse(blog.title.rendered)}</h2>
                      </div>
                      <div className="text">
                        <p>{parse(blog.excerpt.rendered)}</p>
                        <br />
                        <p>{new Date(blog.date).toDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>No Articles found</p>
          ))}
      </div>
    </div>
  );
}



export default NewsList;