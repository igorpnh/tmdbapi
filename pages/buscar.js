import Head from 'next/head';
import Link from 'next/link';
import { baseUrl, apiKey } from '../lib/configApi';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Buscar() {
  const [searchText, setSearchText] = useState('')
  const [movieList, setMovieList] = useState([]);

  const handleSearch = async () => {
    if (searchText !== '') {
      const url = `${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchText}`
      const result = await fetch(url)
      const json = await result.json();

      setMovieList(json.results)
    }
    setSearchText('');
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Busca Filmes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Busca
        </h1>

        <Link href="/">
          <button className={styles.btn}>Home</button>
        </Link >

        <div className={styles.flex}>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className={styles.input}
          />
          <button
            id="btn-submit"
            className={styles.btn}
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>


        <ul>
          {movieList.map(item => (
            <li
              key={item.id}
              className={styles.infos}>
              <a href={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  width="100%"
                  alt="Poster filme"
                />
                <p>{item.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}


