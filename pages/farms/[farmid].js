import farmMap from '../../public/data/farmMap';
import FarmDetail from "../../components/FarmDetail";
import { StyleRoot } from 'radium';
import { stepButtonClasses } from '@mui/material';

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
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.05)'
        },
    };

    return (
        <StyleRoot>
            <div style={styles.main}>
                <FarmDetail selectedFarm={farm}/>
            </div>
        </StyleRoot>
    );
}
export default Farm;