//import { useEffect, useState } from "react";
import { getBannerData } from "../../shared/hooks/getBannerData";
import { MovieBanner } from "../../components/MovieBanner/MovieBanner";
import { TopMovies } from "../../components/TopMovies/TopMovies";
import { useEffect, useState } from "react";
import { getTopMovies } from "../../shared/hooks/getTopMovies";
import { MovieType } from "../../shared/types";

export const MainPage = () => {
  const [bannerData, setBannerData] = useState<MovieType>({});
  const [topTen, setTopTen] = useState([]);
  console.log(topTen);

  useEffect(() => {
    (async () => {
      try {
        const dataTop = await getTopMovies();
        //setBannerData(data);
        setTopTen(dataTop);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const dataBanner = await getBannerData();
        setBannerData(dataBanner);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <MovieBanner data={bannerData} setBannerData={setBannerData} getBannerData={getBannerData}/>
      <TopMovies topTen={topTen} />
    </div>
  );
};
