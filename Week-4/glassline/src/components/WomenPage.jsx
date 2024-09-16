import useSpecdata from "../utils/useSpecdata";
import Card from "./Card";
import { WOMEN_BANNER } from "../utils/constants";

const WomenPage = () => {
  const { specsData, isLoading } = useSpecdata();

  const womenSpecsData = specsData.filter((data) => data.categoryId === "women");

  return (
    <div>
      <img src={WOMEN_BANNER} alt="banner" className="banner" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        {!isLoading &&
          womenSpecsData.map((specData) => (
            <div className="col" key={specData.id}>
              <Card specData={specData} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WomenPage;
