import SearchIcon from '../../public/assets/search-icon.svg';
import Image from 'next/image'
import { useState } from 'react';
import { Popper, Button } from '@mui/material';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { StyleRoot } from 'radium';
import { useRouter } from 'next/router';

function FarmSearchBar(props){

    const styles = {
        main: {
            backgroundColor: '#FFF',
            position: '-webkit-sticky',
            position: 'sticky',
            top: 0,
            width: '100%',
            zIndex:'10',
        },
        topBar: {
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '60%',
            '@media (max-width: 720px)': {
                width: '76%'
            },  
            '@media (max-width: 480px)': {
                width: '90%',
            },
        },
        searchContainer: {
            borderRadius: 10,
            border: '2px solid #D8D8D8',
            boxShadow: '0px 8px 8px rgba(0,0,0,0.03)',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            display: 'flex',
            height: '46px',
            marginTop: 20,
            marginBottom: 20,
            width: '100%',
        },
        searchInputIconContainer: {
            width: 42,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        searchInput: {
            height: '100%',
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: 20,
            backgroundColor: 'transparent',
            marginTop: 'auto',
            marginBottom: 'auto',
        },
        emptyPopper: {
            backgroundColor: '#fff'
        },
        popper: {
            backgroundColor: '#fff',
            borderRadius: 20
        },
        list: { 
            listStyleType: 'none',
            paddingLeft: 40,
            paddingRight: 40
        },
        listItem: { 
            padding: 4,
            textAlignment: "left",
            fontSize: 22
        },
        button: {
            width: '420px',
            textAlign: "left",
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            paddingLeft:'0px',
            whiteSpace: 'nowrap',
            paddingLeft: 10,
            paddingRight: 10,
        },
        rowContainer: {
            display: 'flex', 
            flexDirection: 'row',
            width: '100%'
        }
    };

    const router = useRouter();

    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperOpen, setPopperOpen] = useState(false);

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: "AIzaSyD60x7-aZPCXasJU1tyVbnsnHVDVecu5m0",
        feilds: ["geometry.location","formatted_address"]
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.handle(event.target.value)
            setPopperOpen(false)
            // fetch place details for the first element in placePredictions array
            if (placePredictions.length > 0) {
                placesService?.getDetails(
                    {placeId: placePredictions[0].place_id,},
                    (placeDetails) => {
                        var url = '/farms'
                        const lat = parseFloat(placeDetails.geometry.location.lat())
                        const long = parseFloat(placeDetails.geometry.location.lng())
                        if (window.location.pathname == url){
                            props.setLatAndLong(lat,long)
                            props.setLocation(placeDetails.name)
                        }else{
                            router.push({
                                pathname:url,
                                query: { place: placeDetails.name, lat: lat, long: long }
                            })
                        }
                    }
                );
            }
        }
    }

    function handlePlaceClick(index, placeName){
        setPopperOpen(false)
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length > 0) {
            placesService?.getDetails(
                {placeId: placePredictions[index].place_id,},
                (placeDetails) => {
                    const url = '/farms'
                    const lat = parseFloat(placeDetails.geometry.location.lat())
                    const long = parseFloat(placeDetails.geometry.location.lng())
                    if (window.location.pathname == url){
                        props.setLatAndLong(lat,long)
                        props.setLocation(placeName)
                        setSearchText(placeName)
                        console.log(placeDetails)
                    }else{
                        router.push({
                            pathname:url,
                            query: { place: placeDetails.name, lat: lat, long: long }
                        })
                    }
                }
            );
        }
    }

    return (
        <StyleRoot style={styles.main}>
            <div style={styles.topBar}>
                <div style={styles.searchContainer}>
                    <div style={styles.searchInputIconContainer}>
                    <Image src={SearchIcon} width="18px" alt="search for farmers"/>
                    </div>
                    <div style={styles.rowContainer}>
                        <input placeholder='Search for a location' style={styles.searchInput} value={searchText} onChange={(event) => {
                            if (event.target.value == "") {setPopperOpen(false)} else {setPopperOpen(true)}
                            setSearchText(event.target.value)
                            setAnchorEl(event.currentTarget);
                            getPlacePredictions({ input: event.target.value });
                        }} loading={isPlacePredictionsLoading} onKeyDown={handleKeyDown} ></input>
                        <Button style={{
                            backgroundColor: "#34C759",
                            fontSize: "14px",
                            color: "#fff",
                            fontWeight: "bold",
                            width: "260px",
                            whiteSpace: 'nowrap',
                            marginRight: '2px',
                            borderRadius: '10px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                        }} onClick={()=>{
                            const url = '/farms'
                            if (window.location.pathname == url){
                                window.location.reload();
                            }else{
                                router.push(url)
                            }
                        }}>Use my location</Button>
                    </div>
                    <Popper style={placePredictions.length > 0 ? styles.popper : styles.emptyPopper} placement="bottom-start" anchorEl={anchorEl} id={popperOpen ? 'simple-popper': undefined} open={popperOpen}>
                        <ul style={styles.list}>
                            {placePredictions.map((place, index) => (<div key={index}>
                                <button style={styles.button} onClick={() => handlePlaceClick(index, place.description)}><h3>{place.description}</h3></button> 
                                <div
                                style={{
                                backgroundColor: 'gray',
                                height: '.5px',
                                marginRight: 40,
                                }}/>
                            </div>))}
                        </ul>
                    </Popper>
                </div>
            </div>
        </StyleRoot>
    );
}
export default FarmSearchBar;