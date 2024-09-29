import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="app__spinner">
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
      />
    </div>
  );
};

export default Loader;
