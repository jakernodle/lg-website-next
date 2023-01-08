import { Typography, Button } from '@mui/material';

function FarmListReferralItem(props){

    const styles = {
        mainDiv: { width: '100%' , paddingTop: 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: "40px", borderColor: '#FFF', borderRadius: 20 },
    }

    return (
        <li style={styles.mainDiv}>
            <Typography variant="h4" style={{
            color: "#000",
            fontWeight: "bold",
            }}>Dont see someone?</Typography>
            <Typography variant="h6" style={{
                color: "#000",
                marginTop: "4px",
            }}>Add your farm or refer someone else's. Get $100 when they fullfill their first order.</Typography> 
            <Button type="submit" href="https://i75br6n519w.typeform.com/to/gp4vAbgu" fullWidth variant="contained" 
                style={{
                    //borderRadius: 35,
                    backgroundColor: "#34C759",
                    padding: "14px",
                    marginTop: "12px",
                    fontSize: "18px",
                    color: "#fff",
                    fontWeight: "bold",
                    width: "100%",
                    height: "100%"
                }}>
                Add Farm
            </Button> 
        </li>
    );
}
export default FarmListReferralItem;