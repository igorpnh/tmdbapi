import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [searchText, setSearchText] = useState('')
  const [movieList, setMovieList] = useState([]);

  const handleSearch = async () => {
    if (searchText !== '') {
      const result = await fetch(`http://localhost:3000/api/busca?q=${searchText}`)
      const json = await result.json();

      setMovieList(json.list)
      setSearchText('')
    }
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
            className={styles.btn}
            onClick={handleSearch}
          >
            Buscar
          </button>
          </div>


          <ul >
            {movieList.map(item => (
              <li className={styles.infos}>
                <a  href={`/movie/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width="100%"
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

