import Feed from "../../components/FarmFeed";
import FarmSearchBar from "../../components/FarmSearchBar";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import farmList from "../../public/data/farmData";
import FarmCategories from "../../components/FarmCategorys";
import { useRouter } from 'next/router';
import Head from 'next/head';

// This gets called on every request
export async function getServerSideProps({ query }) {
    console.log("reloading")
    //get location
    const lat = query.lat
    const long = query.long
    var place = query.place

    var location = {lat: 0.0, long: 0.0}
    var farms = []

    if (lat || long) {
        //set location
        location = {lat:  lat, long: long}
        console.log(location)
        // "Fetch" data from external API and sort based on location
        farms = farmList.sort( compareCoordinates )
        farms = farms.slice(0, farmList.length > 25 ? 25 : farmList.length)
        console.log(farms.length, "farm count")
    }else {

        //get location
        var url = "https://www.ipinfo.io?token=379cb78ca0536e"
        var data = await fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        const iplat = parseFloat(data.loc.substr(0, data.loc.indexOf(',')));
        const iplong = parseFloat(data.loc.substr(data.loc.indexOf(',')+1));
        location = {lat:iplat, long:iplong}
        console.log(location)
            
        //sort
        console.log(farmList.length, "farms list count")
        farms = farmList.sort( compareCoordinates )
        farms = farms.slice(0, farmList.length > 25 ? 25 : farmList.length)
        place = data.city
        console.log(place)
        console.log(farms.length, "farm count")
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
        const absLatDist = Math.abs(location.lat-lat)
        const absLongDist = Math.abs(location.long-long)
        return Math.sqrt(Math.pow(absLatDist, 2) + Math.pow(absLongDist, 2))
    }
  
    // Pass data to the page via props
    return { props: { farms, place } }
}

function Farms({farms, place}){

    const styles = {
        main: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)'},
        logo: {width: '56%',
            margin: 20,
            marginTop: 60},
        headerText: { textAlign: 'center', color: "#000", width: '50%', marginTop: 20, marginBottom: 20, fontWeight: 400 },
    };

    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [location, setLocation] = useState(place);
    const [filteredFarms, setFilteredFarms] = useState(farms)
    const [selectedCategories, setSelectedCategories] = useState([]);

    function setLatAndLong(lat,long){
        //currentLoc.current = {lat:lat, long:long}
        //const filtered = filterListForCetegories(farmList, selectedCategories)
        //setSortedFarms(filtered.sort( compareCoordinates ));
        //push url
    }

    useEffect(() => {
        console.log("new farms")
        setFilteredFarms(farms)
        setLocation(place)
    }, [farms])

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        const filtered = filterListForCetegories(farms, selectedCategories)
        setFilteredFarms(filtered)
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

    return (

        <div style={styles.main}>
            <Head>
                <title>{ "Showing farms near " + location }</title>
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
            <Feed farms={filteredFarms}></Feed>
        </div>
    );
}
export default Farms;