import AnimatedBusUpdating from "./AnimatedBusUpdating";
import AnimatedBusUpdated from "./AnimatedBusUpdated";

function BlockRender({ isFetching }) {
  return <>{isFetching ? <AnimatedBusUpdating /> : <AnimatedBusUpdated />}</>;
}

export default BlockRender;
