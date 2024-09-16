import useSpecdata from "../utils/useSpecdata";
import Card from "./Card";
import { KIDS_BANNER } from "../utils/constants";

const KidsPage = () => {
  const { specsData, isLoading } = useSpecdata();

  const kidsSpecsData = specsData.filter((data) => data.categoryId === "kids")

  return (
    <div>
      <img src={KIDS_BANNER} alt="banner" className="banner" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        {!isLoading &&
          kidsSpecsData.map((specData) => (
            <div className="col" key={specData.id}>
              <Card specData={specData} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default KidsPage;
