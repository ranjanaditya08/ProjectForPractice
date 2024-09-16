import React from "react";
import useSpecdata from "../utils/useSpecdata";
import Card from "./Card";
import { HOME_BANNER } from "../utils/constants";

const Home = () => {
  const { specsData, isLoading } = useSpecdata();
 // console.log(specsData);

  return (
    <div>
      <img src={HOME_BANNER} alt="banner" className="banner" />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
        {!isLoading &&
          specsData.map((specData) => (
            <div className="col" key={specData.id}>
              <Card specData={specData} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
