package fsec.parser;

import fsec.parser.config.SensorConfig;
import org.apache.kafka.common.serialization.Deserializer;

/**
 * Kafka Deserializer interface wrapper for the chain parser interface
 */
public class KafkaParser extends ChainParser implements Deserializer<ParsedMessage> {

    public KafkaParser(SensorConfig config) {
        super(config);
    }

    @Override
    public ParsedMessage deserialize(String s, byte[] bytes) {
        return parse(bytes);
    }
}
