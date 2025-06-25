import "../styles.css";

const TextError = (props) => {
  return (
    <div className="err">
      <p>{props.children}</p>
    </div>
  );
};

export default TextError;
