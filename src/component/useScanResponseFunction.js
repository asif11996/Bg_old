import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useScanResponseFunction(navigation, loading, data, success, error) {
  const dispatch = useDispatch();
  const [checkStatus, setCheckStatus] = useState("");

  console.log("use scan response function============>11227", data);

  useEffect(() => {
    if (
      data === null ||
      (typeof data === "object" && Object.keys(data).length === 0)
    ) {
      return;
    } else {
      setCheckStatus(data);
      console.log("messge status is ...............", data?.success);
      console.log("in Else Block:!", success);

      if (data) {
        clears = setTimeout(() => {
          moveToDetail(data);
        }, 700);
      } else {
        stayScanned();
      }
      // data ? moveToDetail(data) : stayScanned();
    }
    return () => {
      clearInterval();
      clearTimeout(clears);
    };
  }, [data]);

  const moveToDetail = (uData) => {
    console.log("use scan response function============>");
    // navigation.navigate("DetailScreen", {
    //   data: uData
    // });
  };
  const stayScanned = () => {
    setCheckStatus("kindly scan again");
  };
  return checkStatus;
}

export default useScanResponseFunction;
