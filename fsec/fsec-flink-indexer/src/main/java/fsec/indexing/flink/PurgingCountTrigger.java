package fsec.indexing.flink;

import org.apache.flink.api.common.functions.ReduceFunction;
import org.apache.flink.api.common.state.ReducingState;
import org.apache.flink.api.common.state.ReducingStateDescriptor;
import org.apache.flink.api.common.typeutils.base.LongSerializer;
import org.apache.flink.streaming.api.windowing.triggers.Trigger;
import org.apache.flink.streaming.api.windowing.triggers.TriggerResult;
import org.apache.flink.streaming.api.windowing.windows.Window;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PurgingCountTrigger<W extends Window> extends Trigger<Object, W> {
    private static final Logger LOG = LoggerFactory.getLogger(PurgingCountTrigger.class);

    private static final long serialVersionUID = 1L;
    private final long maxCount;
    private final ReducingStateDescriptor<Long> stateDesc;

    private PurgingCountTrigger(long maxCount) {
        this.stateDesc = new ReducingStateDescriptor("count", new PurgingCountTrigger.Sum(), LongSerializer.INSTANCE);
        this.maxCount = maxCount;
    }

    public TriggerResult onElement(Object element, long timestamp, W window, TriggerContext ctx) throws Exception {
        ReducingState<Long> count = (ReducingState) ctx.getPartitionedState(this.stateDesc);
        count.add(1L);

        if ((Long) count.get() >= this.maxCount) {
            count.clear();
            return TriggerResult.FIRE_AND_PURGE;
        }
        if (window.maxTimestamp() <= ctx.getCurrentWatermark()) {
            return TriggerResult.FIRE_AND_PURGE;
        } else {
            ctx.registerEventTimeTimer(window.maxTimestamp());
            return TriggerResult.CONTINUE;
        }
    }

    public TriggerResult onEventTime(long time, W window, TriggerContext ctx) {
        return time == window.maxTimestamp() ? TriggerResult.FIRE_AND_PURGE : TriggerResult.CONTINUE;
    }

    public TriggerResult onProcessingTime(long time, W window, TriggerContext ctx) throws Exception {
        ctx.registerEventTimeTimer(window.maxTimestamp());
        return time == window.maxTimestamp() ? TriggerResult.FIRE_AND_PURGE : TriggerResult.CONTINUE;
    }

    public void clear(W window, TriggerContext ctx) throws Exception {
        ctx.deleteEventTimeTimer(window.maxTimestamp());
        ((ReducingState) ctx.getPartitionedState(this.stateDesc)).clear();
    }

    public boolean canMerge() {
        return true;
    }

    public void onMerge(W window, OnMergeContext ctx) throws Exception {
        long windowMaxTimestamp = window.maxTimestamp();
        if (windowMaxTimestamp > ctx.getCurrentProcessingTime()) {
            ctx.registerEventTimeTimer(windowMaxTimestamp);
        }
        ctx.mergePartitionedState(this.stateDesc);
    }

    public String toString() {
        return "CountTrigger(" + this.maxCount + ")";
    }

    public static <W extends Window> PurgingCountTrigger<W> of(long maxCount) {
        return new PurgingCountTrigger(maxCount);
    }

    private static class Sum implements ReduceFunction<Long> {
        private static final long serialVersionUID = 1L;

        private Sum() {
        }

        public Long reduce(Long value1, Long value2) throws Exception {
            return value1 + value2;
        }
    }
}


