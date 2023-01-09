import { Typography, Button } from '@mui/material';
import FarmerIcon from '../public/assets/farmer-whitebg-svgrepo-com.svg';
import { StyleRoot } from 'radium';

function FarmDetail(props){

    const styles = {
        main: { 
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop:'20px',
            backgroundColor: '#fff',
            width: 480, 
            '@media (max-width: 480px)': {
                width: '100%',
            },
        },
        headerImage: { padding: 0, height: 280, width: '100%', objectFit: 'cover', borderRadius: 20 },
        content: { margin: 20 },
        farmerImage: { width: '16%', aspectRatio: 1,  borderRadius:"50%", objectFit: 'cover', border: '3px solid #D8D8D8', },
        rowDiv: { paddingTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'},
        colDiv: { paddingLeft: 20, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left'},
    };



    return (
        <StyleRoot style={styles.main}>
            <img 
            style={styles.headerImage}
            src={props.selectedFarm.pictureURL}
            alt="local farm logo"
            />
            <div style={styles.content}>
                <h1 style={{
                    textAlign: 'left',
                    color: "#000",
                    marginTop: 4,
                    marginBottom: 8,
                    width: '100%',
                    paddingBottom: 0,
                }}>{props.selectedFarm.name}</h1>
                <Typography variant="p" style={{
                    textAlign: 'left',
                    fontSize: 17,
                    color: "#000",
                    marginTop: 4,
                    width: '100%',
                }}>{props.selectedFarm.description}</Typography>
                <Typography variant="h5" style={{
                        color: "#000",
                        paddingTop: 12
                        }}>All Products</Typography>
                <ul>{props.selectedFarm.allProducts.map(product => (<li key={product}>{product}</li>))}</ul>
                <div style={styles.rowDiv}>
                    <img 
                    style={styles.farmerImage}
                    src={props.selectedFarm.primaryFarmerInfo.pictureURL != "" ? props.selectedFarm.primaryFarmerInfo.pictureURL : '/assets/farmer-whitebg-svgrepo-com.svg'}
                    alt="farmer"
                    />
                    <div style={styles.colDiv}>
                        <Typography variant="h5" style={{
                        color: "#000",
                        }}>{props.selectedFarm.primaryFarmerInfo.name}</Typography>
                        <Typography variant="h7" style={{
                            color: "#000",
                        }}>{props.selectedFarm.primaryFarmerInfo.contact}</Typography>
                    </div>
                </div>
                <Button type="submit" href={props.selectedFarm.website} fullWidth variant="contained" 
                style={{
                    //borderRadius: 35,
                    backgroundColor: "#34C759",
                    padding: "14px",
                    marginTop: "18px",
                    fontSize: "18px",
                    color: "#fff",
                    fontWeight: "bold",
                    width: "100%",
                    height: "100%"
                }}>
                Visit Website
                </Button>
            </div>
        </StyleRoot>
    );
}
export default FarmDetail;