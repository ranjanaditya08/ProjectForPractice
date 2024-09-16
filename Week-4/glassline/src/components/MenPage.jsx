import useSpecdata from "../utils/useSpecdata";
import Card from "./Card";
import { MEN_BANNER } from "../utils/constants";

const MenPage = () => {
  const { specsData, isLoading } = useSpecdata();
  // const [menSpecsData, setMenSpecsData] = useState([]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     setMenSpecsData(specsData.filter((data) => data.categoryId === "men"));
  //   }
  // }, [isLoading, specsData]); // Trigger useEffect when `isLoading` or `specsData` changes

  const menSpecsData = specsData.filter((data) => data.categoryId === "men")

  return (
    <div>
      <img src={MEN_BANNER} alt="banner" className="banner" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        {!isLoading &&
          menSpecsData.map((specData) => (
            <div className="col" key={specData.id}>
              <Card specData={specData} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenPage;
