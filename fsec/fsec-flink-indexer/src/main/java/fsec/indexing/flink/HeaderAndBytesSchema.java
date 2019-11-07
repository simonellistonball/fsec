package fsec.indexing.flink;

import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.connectors.kafka.KafkaDeserializationSchema;
import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.nio.charset.StandardCharsets;

public class HeaderAndBytesSchema implements KafkaDeserializationSchema<Tuple2<String,byte[]>> {

    @Override
    public boolean isEndOfStream(Tuple2<String,byte[]> s) {
        return false;
    }

    @Override
    public Tuple2<String,byte[]> deserialize(ConsumerRecord<byte[], byte[]> consumerRecord) throws Exception {
        // parse the header to get the destination topic (note this is a change from Metron which
        // does not use headers at all
        String sourceType = new String(consumerRecord.headers().lastHeader("source").value(), StandardCharsets.UTF_8);
        return Tuple2.of(sourceType, consumerRecord.value());
    }

    @Override
    public TypeInformation<Tuple2<String,byte[]>> getProducedType() {
        return null;
    }
}
