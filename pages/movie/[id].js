import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function MovieItem({ info }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Busca Filmes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Informações Detalhadas
                </h1>
                <div className={styles.flex}>
                    <Link href="/">
                        <button className={styles.btn}>Home</button>
                    </Link >
                    <Link href="/buscar">
                        <button className={styles.btn}>Buscar</button>
                    </Link>
                </div>
                <div className={styles.containerInfo}>
                    <h2>{info.title}</h2>
                    <div className={styles.allInfo}>
                        
                        <img
                            src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                            width="25%"
                        />
                        
                        <span className={styles.desc}>
                            <p>Gênero: {info.genres[0].name} </p>
                            <p>Origem: {info.production_countries[0].name}</p>
                            <p>Nota: {info.vote_average}</p>
                            <hr></hr>
                                <p className={styles.overview}>{info.overview}</p>
                            
                        </span>
                    </div>
                </div>
            </main>
        </div>
    )
}
//página será renderizada como serverside, tudo que for serverside só é renderizado 1 única vez. 
//os componentes acima /\ são renderizados como react normal
export async function getServerSideProps(context) {

    const res = await fetch(`http://localhost:3000/api/movie/${context.params.id}`); ''
    const json = await res.json();
    console.log(json);

    return {
        props: {
            info: json.info
        }
    }
}
