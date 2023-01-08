import FarmListItem from "./FarmListItem";
import FarmListReferralItem from "./FarmListReferralItem";
import { StyleRoot } from 'radium';

function Feed(props){

    const styles = {
        list: { listStyleType: 'none', paddingInlineStart: 0, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, width: '44%', 
        '@media (max-width: 720px)': {
            width: '76%'
        },  
        '@media (max-width: 480px)': {
            width: '90%',
        }, 
        },
    };

    return (
        <StyleRoot>
            <ul style={styles.list}>
                {props.farms.map(farm => ( <FarmListItem farmData={farm} selectFarm={props.selectFarm} toggleDrawer={props.toggleDrawer}/>))}
                <FarmListReferralItem/>
            </ul>
        </StyleRoot>
    );
}
export default Feed;