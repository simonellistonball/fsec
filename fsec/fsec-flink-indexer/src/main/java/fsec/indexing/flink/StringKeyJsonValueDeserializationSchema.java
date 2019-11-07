package fsec.indexing.flink;

import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.java.typeutils.TypeExtractor;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.JsonNode;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.flink.streaming.connectors.kafka.KafkaDeserializationSchema;
import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.io.IOException;

public class StringKeyJsonValueDeserializationSchema implements KafkaDeserializationSchema<ObjectNode> {
    private static final long serialVersionUID = 1509391548173891955L;
    private final boolean includeMetadata;
    private ObjectMapper mapper;

    public StringKeyJsonValueDeserializationSchema(boolean includeMetadata) {
        this.includeMetadata = includeMetadata;
    }

    public ObjectNode deserialize(ConsumerRecord<byte[], byte[]> record) throws Exception {
        if (this.mapper == null) {
            this.mapper = new ObjectMapper();
        }

        ObjectNode node = this.mapper.createObjectNode();
        if (record.key() != null) {
        }

        if (record.value() != null) {
            node.set("value", (JsonNode)this.mapper.readValue((byte[])record.value(), JsonNode.class));
        }

        if (this.includeMetadata) {
            node.putObject("metadata").put("offset", record.offset()).put("topic", record.topic()).put("partition", record.partition());
        }

        return node;
    }

    public boolean isEndOfStream(ObjectNode nextElement) {
        return false;
    }

    public TypeInformation<ObjectNode> getProducedType() {
        return TypeExtractor.getForClass(ObjectNode.class);
    }
}
