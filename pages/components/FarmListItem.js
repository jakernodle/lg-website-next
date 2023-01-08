import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import FarmerIcon from '../../public/assets/farmer-whitebg-svgrepo-com.svg';
import Image from 'next/image'

function FarmListItem(props){

    const styles = {
        mainDiv: { width: '100%' , marginTop: 30, borderRadius:25, paddingBottom: 30, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' },
        button: { 
            textAlign: "left",
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            padding: 0,
            width: '100%',
            cursor: 'pointer'
        },
        headerImage: { width: '100%', objectFit: 'cover', borderTopLeftRadius:25, borderTopRightRadius:25 },
        farmerImage: { width: '17%', aspectRatio: 1,  borderRadius:"50%", objectFit: 'cover', border: '3px solid #D8D8D8', },
        rowDiv: { paddingLeft: 40, paddingTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'},
        colDiv: { paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', },
    }
    
    const router = useRouter();

    return (
        <li style={styles.mainDiv}>
            <button style={styles.button} onClick={()=>{
                props.selectFarm(props.farmData)
                const url = '/farms'
                router.push({
                    pathname:url,
                    query: { id: props.farmData.id }
                }, undefined, { shallow: true })
                props.toggleDrawer(true)
            }}>
                <img 
                style={styles.headerImage}
                src={props.farmData.pictureURL}
                alt="local farm"
                />
                <div style={styles.rowDiv}>
                    <img 
                    style={styles.farmerImage}
                    src={props.farmData.primaryFarmerInfo.pictureURL != "" ? props.farmData.primaryFarmerInfo.pictureURL : '/assets/farmer-whitebg-svgrepo-com.svg'}
                    alt="local farmer"
                    />
                    <div style={styles.colDiv}>
                        <Typography variant="h5" style={{
                        color: "#000",
                        }}>{props.farmData.name}</Typography>
                        <h2 style={{
                            color: "#000",
                            fontWeight: 'bold',
                            marginBottom: 6,
                            marginTop: 0,
                        }}>{props.farmData.location}</h2>
                        <Typography variant="h7" style={{
                            color: 'rgba(0,0,0,0.5)',
                        }}>{props.farmData.categories.join(", ")}</Typography>
                    </div>
                </div>
            </button>
        </li>
    );
}
export default FarmListItem;