import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {baseUrl, apiKey} from '../lib/configApi';

export default function Home({ list }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Busca Filmes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Destaques da semana
        </h1>
        <Link href="/buscar">
          <button className={styles.btn}>Buscar</button>
        </Link>
        <ul>
          {list.map(item => (
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
//página será renderizada como serverside, tudo que for serverside só é renderizado 1 única vez. 
//os componentes acima /\ são renderizados como react normal
export async function getServerSideProps() {
  const url = `${baseUrl}/trending/movie/week?api_key=${apiKey}&language=pt-BR`
  const response = await fetch(url);
  const list = await response.json();
  console.log(list)

  return {
    props: {
      list: list === false ? [] : list.results
    }

    
  }
  console.log(list)
}
