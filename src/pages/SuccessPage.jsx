import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { propertyId } = useParams();

  console.log(propertyId);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
