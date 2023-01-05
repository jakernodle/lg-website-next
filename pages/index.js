import logo from '../public/assets/Locallygrowntextlabel.png';
import previewImage from '../public/assets/locally-grown-preview.png';
import emailjs from 'emailjs-com';
import Image from 'next/image'
//import FarmSearchBar from './components/FarmSearchBar';
import { Button, Typography, TextField, InputAdornment } from '@mui/material';
import { StyleRoot } from 'radium';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const handleSubmit = (e) => {
  e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

  emailjs.sendForm('service_x0g4pua', 'template_es371m5', e.target, '65aTNmL2iomo7NJgv')
    .then((result) => {
        window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
    }, (error) => {
        console.log(error.text);
    });
};

const handleChange = (event) => {

};

const styles = {
  App: {
    textAlign: 'center'
  },
  AppHeader: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  main: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)'},
  logoDiv: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    width: '56%',
    aspectRatio:'6',
    margin: 20,
    marginTop: 60,
    '@media (max-width: 480px)': {
      width: '90%',
    },
  },
  headerText: { textAlign: 'center', fontSize: 40, color: "#000", width: '50%', marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', fontWeight: 400,
  '@media (max-width: 480px)': {
    width: '90%',
  }, 
  },
  appPreviewRowDiv: { marginTop: 20, marginBottom:40, display: 'flex', flexDirection: 'row',
  '@media (max-width: 480px)': {
    flexDirection: 'column',
  },
  alignItems: 'center', justifyContent: 'center',
  },
  appPreviewButtonsRowDiv: { width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left',
  '@media (max-width: 480px)': {
    alignItems: 'center', justifyContent: 'center'
  },
  },
  appPreviewColDiv: { width: '30%', margin: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  '@media (max-width: 480px)': {
    width: '90%'
  },
  },
  previewHeaderText: { width: '100%', textAlign: 'left', fontSize: 56, fontWeight: 'bold', marginTop: 0, marginBottom: 0,
  '@media (max-width: 480px)': {
    textAlign: 'center'
  },
  },
  previewDivText: {textAlign: 'left', fontSize: 40, fontWeight: '400', 
  '@media (max-width: 480px)': {
    textAlign: 'center',
    width: '90%',
  },
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#000",
    padding: "14px",
    '@media (max-width: 480px)': {
      paddingLeft: "0px",
    },
    fontSize: "18px",
    color: "#fff",
    margin: "10px",
    fontWeight: "bold",
    width: "160px",
    height: "100%"
  },
  FooterDiv: {
    width: '100%',
    backgroundColor: '#34C759',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
    },
    alignItems: 'left',
    justifyContent: 'left',
  },
  FooterDivForm: {
    width: '100%',
    textAlign: 'left',
    fontSize: '36px',
    paddingLeft:'1em',
    paddingRight:'1em',
    paddingBottom:'0.5em',
    marginRight: 'auto',
  },
  PreviewImageDiv: {
    position: 'relative',
    width: '50%',
    aspectRatio: '1',
    '@media (max-width: 480px)': {
      width: '100%'
    },
  }
};

function Home() {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StyleRoot>
      <div style={styles.App}>
        <Helmet>
            <title>Find NC Farmers</title>
            <meta name="description" content="Tired of going to the North Carolina farmers market? Locally Grown is an easy way to find NC farms selling meat, produce, and dairy." />
        </Helmet>
        <header tyle={styles.AppHeader}>
          <div style={styles.logoDiv}>
            <Image src={logo} layout='fill' objectFit='contain' alt="local farms logo" />
          </div>
          <h1 style={styles.headerText}>Search North Carolina farms selling meat, produce, and dairy.</h1>
          
        </header>
        <div className="Preview-Div">
          <div style={styles.appPreviewRowDiv}>
          <div style={styles.appPreviewColDiv}>
              <h1 style={styles.previewHeaderText}>Coming soon.</h1>
              <h1 style={styles.previewDivText}>Find local farms, place orders and get food delivered all with the Locally Grown app.</h1>
              <div style={styles.appPreviewButtonsRowDiv}>
                <Button href="https://i75br6n519w.typeform.com/to/B9a1jiTL" style={{
                  borderRadius: 10,
                  backgroundColor: "#34C759",
                  padding: "12px 20px",
                  fontSize: "18px",
                  color: "#fff",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}>For Farmers </Button>
                <Button href="https://i75br6n519w.typeform.com/to/syommTDL" style={{
                  borderRadius: 10,
                  backgroundColor: "#34C759",
                  padding: "12px 20px",
                  fontSize: "18px",
                  color: "#fff",
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginLeft: "16px",
                  fontWeight: "bold",
                }}>For Shoppers</Button>
              </div>
            </div>
            <div style={styles.PreviewImageDiv}>
              <Image src={previewImage} layout='fill' objectFit='contain' alt="iphone ios food app preview" />
            </div>
          </div>
        </div>
        <div style={styles.FooterDiv}>
          <div style={styles.rowContainer}>
            <div style={styles.FooterDivForm}>
                <Typography variant="h4" style={{
                  color: "#000",
                  fontWeight: 'bold',
                  marginTop: '24px'
                }}>Add your farm</Typography>
                <Typography variant="p" style={{
                color: "#000",
                fontSize: '26px',
                paddingBottom: '24px',
              }}>Add your farm or refer someone else&apos;s. Get $100 when they fullfill their first order.</Typography>
              <form onSubmit={handleSubmit}>
                <div style={styles.rowContainer}>
                  <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    style={{
                    // border: 'solid 1px #000',
                      backgroundColor: '#ffffff',
                      maxWidth: "350px",
                      marginTop: "12px",
                    }}
                    onChange={handleChange}
                  // value={userData['email']}
                    InputLabelProps={{ required: false }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {error && (
                    <Typography color="error" align="center">
                      {error}
                    </Typography>
                  )} */}
                  <Button type="submit" fullWidth variant="contained" 
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#000",
                      padding: "14px",
                      fontSize: "18px",
                      color: "#fff",
                      margin: "10px",
                      fontWeight: "bold",
                      width: "160px",
                      height: "100%"
                    }}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            <Typography variant="p" style={{
                  color: "#000",
                  fontWeight: 'bold',
                  fontSize: '22px',
                  marginBottom: 'auto',
                  paddingLeft: '2em',
                  paddingRight: '2em',
                  paddingBottom: '2em',
                  marginTop: '30px'
                }}>ja@locallygrown.app</Typography>
          </div>
        </div>
      </div>
    </StyleRoot>
  );
}

export default Home;