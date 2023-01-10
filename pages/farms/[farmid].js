import farmMap from '../../public/data/farmMap';
import FarmDetail from "../../components/FarmDetail";
import { StyleRoot } from 'radium';
import FarmSearchBar from '../../components/FarmSearchBar';
import Head from 'next/head';

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const keys = Object.keys(farmMap);

    // Get the paths we want to pre-render based on posts
    const paths = keys.map((key) => ({
        params: { farmid: key},
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const farm = farmMap[params.farmid]
    // Pass data to the page via props
    return { props: { farm } }
}

function Farm({ farm }){

    const styles = {
        main: {
            paddingTop:'20px',
            paddingBottom:'20px', 
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.05)'
        },
        search: {
            position: '-webkit-sticky',
            position: 'sticky',
            top: 0,
        }
    };

    return (
        <StyleRoot>
            <Head>
                <title>{ "See what" + farm.name + "is selling and place an order."}</title>
                <meta
                    name="description"
                    content= {farm.description}
                    key="desc"
                />
                <meta name="keywords" content={farm.allProducts.join(", ")} />
                <meta name="geo.placename" content={farm.location} />
                <meta name="geo.position" content={farm.coordinates.latitude + ";" + farm.coordinates.longitude} />
                <meta name="geo.region" content="North Carolina" />
                <meta name="ICBM" content={farm.coordinates.latitude + "," + farm.coordinates.longitude} />
            </Head>
            <div style={styles.search}>
                <FarmSearchBar small={true}/>
            </div>
            <div style={styles.main}>
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                height: 100%;
                }
            `}</style>
                <FarmDetail selectedFarm={farm}/>
                
            </div>
        </StyleRoot>
    );
}
export default Farm;