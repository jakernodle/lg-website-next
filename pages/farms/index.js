import Feed from "../../components/FarmFeed";
import FarmSearchBar from "../../components/FarmSearchBar";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import farmList from "../../public/data/farmData";
import FarmCategories from "../../components/FarmCategorys";
import { useRouter } from 'next/router';
import Head from 'next/head';

// This gets called on every request
/*export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}*/

function Farms(){

    const styles = {
        main: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)'},
        logo: {width: '56%',
            margin: 20,
            marginTop: 60},
        headerText: { textAlign: 'center', color: "#000", width: '50%', marginTop: 20, marginBottom: 20, fontWeight: 400 },
    };

    const router = useRouter();

    const { place, lat, long } = router.query;

    var placeInit = ""
    var latLongInit = {lat: 0.0, long: 0.0}
    if (place) {
        placeInit = place
        latLongInit = {lat:  lat, long: long}
    }

    const [searchText, setSearchText] = useState("");
    const [location, setLocation] = useState(placeInit);
    const [sortedFarms, setSortedFarms] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    var currentLoc = useRef(latLongInit);


    function setLatAndLong(lat,long){
        currentLoc.current = {lat:lat, long:long}
        const filtered = filterListForCetegories(farmList, selectedCategories)
        setSortedFarms(filtered.sort( compareCoordinates ));
    }

    useEffect(() => {
        console.log("init use effect", currentLoc.current.lat, currentLoc.current.long)
    
        if (currentLoc.current.lat == 0.0) {
            getLocationAndSort(farmList)
        }else{
            setSortedFarms(farmList.sort( compareCoordinates ))
        }
    }, []);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        console.log("category use effect", currentLoc.current.lat, currentLoc.current.long)
        const filtered = filterListForCetegories(farmList, selectedCategories)
        setSortedFarms(filtered.sort( compareCoordinates ))
    }, [selectedCategories]);

    function filterListForCetegories(list, categories) {
        console.log(categories)
        if (categories.length == 0) { return list; }
        var filteredList = [];
        for (let listIndex=0; listIndex < list.length; listIndex++) {
            for (let categoryIndex=0; categoryIndex < categories.length; categoryIndex++){
                if (list[listIndex].categories.indexOf(categories[categoryIndex]) !== -1) {
                    filteredList.push(list[listIndex])
                    break;
                }
            }
        }
        return filteredList
    }
    
    function getLocationAndSort(farms) {
        var url = "https://www.ipinfo.io?token=379cb78ca0536e"

        fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            setLocation(data.city)
            const lat = parseFloat(data.loc.substr(0, data.loc.indexOf(',')));
            const long = parseFloat(data.loc.substr(data.loc.indexOf(',')+1));
            currentLoc.current = {lat:lat, long:long}
            setSortedFarms(farms.sort( compareCoordinates ))
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    function compareCoordinates( a, b ) {
        const farm1Distance = distance(parseFloat(a.coordinates.latitude), parseFloat(a.coordinates.longitude))
        a["distance"] = farm1Distance*69.2;
        const farm2Distance = distance(parseFloat(b.coordinates.latitude), parseFloat(b.coordinates.longitude))
        b["distance"] = farm2Distance*69.2;

        if (farm1Distance < farm2Distance){
          return -1;
        }else {
          return 1;
        }
    }

    function distance(lat, long){
        const absLatDist = Math.abs(currentLoc.current.lat-lat)
        const absLongDist = Math.abs(currentLoc.current.long-long)
        return Math.sqrt(Math.pow(absLatDist, 2) + Math.pow(absLongDist, 2))
    }

    return (
        //<img src={logo} style={styles.logo} alt="logo" />
        //<Typography variant="h3" style={styles.headerText}>Search North Carolina farms selling meat, produce, and dairy.</Typography>
        // <Drawer
        //         anchor='right'
        //         open={drawerOpen}
        //         onClose={() => {
        //             router.push({
        //                 pathname:'/farms'}, undefined, { shallow: true })
        //             setDrawerOpen(false)
        //         }}
        //     >
        //         {drawerOpen == true && 
        //         (<FarmDetail selectedFarm={selectedFarm}/>)
        //         }
        //     </Drawer>
        <div style={styles.main}>
            <Head>
                <title>{ "Showing farms near " + place }</title>
                <meta
                    name="description"
                    content= {"Search for North Carolina farms selling meat, produce, and dairy."}
                    key="desc"
                />
            </Head>
            <FarmSearchBar handle={setSearchText} setLatAndLong={setLatAndLong} setLocation={setLocation}/>
            <h1 style={{
                    color: "#000",
                    marginTop: 4,
                    textAlign: 'center',
                    paddingTop: 40,
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 40

                }}>{(location != "") ? ("Showing farms near " + location) : ""}</h1>
            <FarmCategories categories={selectedCategories} selectCategory={setSelectedCategories}/>
            <Feed farms={sortedFarms}></Feed>
        </div>
    );
}
export default Farms;