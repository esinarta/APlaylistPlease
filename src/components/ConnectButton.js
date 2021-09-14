import SpotifyIcon from '../assets/Spotify_Icon_RGB_White.png'

const ConnectButton = ({ link }) => {
  const containerStyle = {
    backgroundColor: "#26D863",
    padding: "10px",
    outline: 0,
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    display: 'flex', 
    marginLeft: "auto",
    width: "11em",
    justifyContent: "center"
  }

  const iconStyle = {
    height: "21px",
    width: "21px",
    paddingRight: "0.5em"
  }

  const style = {
    color: "#FFFFFF",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <img src={SpotifyIcon} alt="Spotify Icon" style={iconStyle}/>
      <a style={style} href={link}>
        Connect to Spotify
      </a>
    </div>
  );
};

export default ConnectButton;