import ProduceIcon from '../public/assets/carrot-svgrepo-com.svg';
import DairyIcon from '../public/assets/cow-svgrepo-com.svg';
import MeetIcon from '../public/assets/sausage-meat-svgrepo-com.svg';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { StyleRoot } from 'radium';
import Image from 'next/image'

function FarmCategories(props){

    const styles =  {
        mainDiv: { marginLeft: 'auto', marginRight: 'auto', width: 'calc(320px + 6vw)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        },
        colDiv: { width: '100%', margin: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'},
        button: { backgroundColor: '#fff', borderRadius: 20, width: 'calc(70px + 6vw)', aspectRatio: '2', border: '3px solid #000000', },
        selectedButton: { backgroundColor: '#c0c0c0', borderRadius: 20, width: 'calc(70px + 6vw)', aspectRatio: '2', border: '3px solid #000000', },
        image: { position: 'relative', height: '80%', paddingTop: 10, paddingBottom: 10, objectFit: 'cover',  marginLeft: '18%', marginRight: '18%', }
    };

    const [produceSelected, setProduceSelected] = useState(false);
    const [diarySelected, setDairySelected] = useState(false);
    const [meatSelected, setMeatSelected] = useState(false);

    function selectProduce(){
        props.selectCategory(oldArray => {
            if (oldArray.indexOf("Fruits") !== -1 || oldArray.indexOf("Vegetables") !== -1){
                return oldArray.filter(category => {
                    return category != "Fruits" && category != "Vegetables";
                })
            }else{
                return [...oldArray, "Fruits", "Vegetables"]
            }
        })
    }
    function selectDairy(){
        props.selectCategory(oldArray => {
            if (oldArray.indexOf("Dairy/Eggs") !== -1){
                return oldArray.filter(category => {
                    return category != "Dairy/Eggs";
                })
            }else{
                return [...oldArray, "Dairy/Eggs"]
            }
        })
    }
    function selectMeat(){
        props.selectCategory(oldArray => {
            if (oldArray.indexOf("Meats/Livestock") !== -1){
                return oldArray.filter(category => {
                    return category != "Meats/Livestock";
                })
            }else{
                return [...oldArray, "Meats/Livestock"]
            }
        })
    }

    return (
        <StyleRoot style={styles.mainDiv}>
            <div style={styles.colDiv}>
                {(props.categories.indexOf("Fruits") !== -1 || props.categories.indexOf("Vegetables") !== -1) ?
                (<>
                <button style={styles.selectedButton} onClick={selectProduce}>
                <div style={styles.image}>
                    <Image src={ProduceIcon} layout='fill' objectFit='contain'  alt="view farms selling produce"/>
                    </div>
                </button>
                </>)
                :
                (<>
                <button style={styles.button} onClick={selectProduce}>
                <div style={styles.image}>
                    <Image src={ProduceIcon} layout='fill' objectFit='contain'  alt="view farms selling produce"/>
                    </div>
                </button>
                </>)
            }
                <Typography variant="h6" style={{
                    color: "#000",
                    fontWeight: 'bold',
                    marginTop: 4
                }}>Produce</Typography>
            </div>
            <div style={styles.colDiv}>
                {props.categories.indexOf("Dairy/Eggs") !== -1 ?
                (<>
                <button style={styles.selectedButton} onClick={selectDairy}>
                <div style={styles.image}>
                    <Image src={DairyIcon} layout='fill' objectFit='contain'  alt="farms selling eggs and dairy"/>
                    </div>
                </button>
                </>)
                :
                (<>
                <button style={styles.button} onClick={selectDairy}>
                <div style={styles.image}>
                    <Image src={DairyIcon} layout='fill' objectFit='contain'  alt="farms selling eggs and dairy"/>
                    </div>
                </button>
                </>)
            }
            <Typography variant="h6" style={{
                    color: "#000",
                    fontWeight: 'bold',
                    marginTop: 4
                }}>Dairy/Eggs</Typography>
            </div>
            <div style={styles.colDiv}>
                {props.categories.indexOf("Meats/Livestock") !== -1 ?
                (<>
                <button style={styles.selectedButton} onClick={selectMeat}>
                    <div style={styles.image}>
                        <Image src={MeetIcon} layout='fill' objectFit='contain'  alt="farms selling meat"/>
                    </div>
                </button>
                </>)
                :
                (<>
                <button style={styles.button} onClick={selectMeat}>
                <div style={styles.image}>
                    <Image src={MeetIcon} layout='fill' objectFit='contain' alt="farms selling meat"/>
                    </div>
                </button>
                </>)
                }
                <Typography variant="h6" style={{
                    color: "#000",
                    fontWeight: 'bold',
                    marginTop: 4,
                }}>Meat</Typography>
            </div>
        </StyleRoot>
    );
}
export default FarmCategories;