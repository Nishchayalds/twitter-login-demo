import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfinityScroll({ data, view, partner }: any) {
  const [newData, setNewData] = useState<any>(data);
  const [oldData, setOldData] = useState<any>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewData(data ? data : oldData);
  }, [data]);

  const handleNext = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(newData?.next);
      setNewData({
        next: data.next,
        previous: data.previous,
        count: data.count,
        results: [...newData.results, ...data.results],
      });
      setNewData({
        next: data.next,
        previous: data.previous,
        count: data.count,
        results: [...newData.results, ...data.results],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const hasMore = newData?.results?.length < newData?.count;
  console.log(hasMore, "dfkjdlfkslkf")
  const handleRefresh = async () => {};
  return (
    <div className=" ">
      <InfiniteScroll
        dataLength={newData?.results?.length} //This is important field to render the next data
        next={handleNext}
        hasMore={newData?.results?.length != newData?.count}
        loader={
          <p className="text-center font-optima cursor-pointer mb-5 mt-5">
            {loading ? (
              <p className="transition-all animate-pulse duration-700 text-green">
                Loading...
              </p>
            ) : (
              <b onClick={handleNext} className={`text-[#868686] text-[14px] font-[400] ${hasMore ? "hidden" : "block"}`}>
                View All
              </b>
            )}
          </p>
        }
        // endMessage={
        //   <p className="mt-5 font-space md:text-lg text-white text-center">
        //     <b>View All</b>
        //   </p>
        // }
        //   below props only if you need pull down functionality
        // refreshFunction={handleRefresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 className="mt-5 font-space text-lg text-white text-center">
        //     &#8595; Pull down to refresh
        //   </h3>
        // }
        // releaseToRefreshContent={
        //   <h3 className="mt-5 font-space text-lg text-white text-center">
        //     &#8593; Release to refresh
        //   </h3>
        // }
      >
        <div
          className={`w-full flex flex-wrap md:p-5 sm:gap-2 items-center ${
            partner ? "justify-start" : "justify-center"
          } `}
        >
          {newData?.results?.map((item: any, index: number) =>
            view(item, index)
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
