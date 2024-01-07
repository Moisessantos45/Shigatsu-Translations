import "../css/LoadingWeb.css";

const Loading = () => {
  return (
    <>
      <div className="loader_web">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
