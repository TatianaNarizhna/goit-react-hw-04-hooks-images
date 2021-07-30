import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="Spinner">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Spinner;
