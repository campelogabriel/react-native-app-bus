import AnimatedBusUpdating from "./AnimatedBusUpdating";
import AnimatedBusUpdated from "./AnimatedBusUpdated";
import NoBattery from "./NoBattery";

function BlockRender({ isFetching, busesOnMap, count }) {
  if (count == 10) return <NoBattery />;
  return (
    <>
      {isFetching ? (
        <AnimatedBusUpdating />
      ) : (
        <AnimatedBusUpdated busesOnMap={busesOnMap} />
      )}
    </>
  );
}

export default BlockRender;
