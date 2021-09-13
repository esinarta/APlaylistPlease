const AppButton = ({ text, onClick, disabled }) => {
  const style = {
    color: "black",
    backgroundColor: "#FFFFFF",
    padding: "10px",
    outline: 0,
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    margin: 10,
  };

  return (
    <button style={style} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default AppButton;