package fsec.indexing.flink;

import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;

import java.util.Properties;

import static fsec.indexing.CommonIndexingUtils.filterFunction;
import static fsec.indexing.CommonIndexingUtils.projectionFunction;

public class SolrSmartIndexingJob {

    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        ParameterTool parameter = ParameterTool.fromArgs(args);

        env.setParallelism(parameter.getInt("parallelism", 1));

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", parameter.get("bootstrap-server"));
        properties.setProperty("group.id", parameter.get("group-id", "fsec-indexing-solr-smart"));
        properties.setProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        DataStream<ObjectNode> stream = env
                .addSource(new FlinkKafkaConsumer<ObjectNode>("indexing", new StringKeyJsonValueDeserializationSchema(false), properties));

        Properties config = new Properties();

        stream.map(n -> (ObjectNode) n.get("value"))
                .map(projectionFunction(config))
                .filter(filterFunction(config))
                // needs a smarter kryo serializer for the SolrInputDocuments to make this work
                .keyBy(doc -> doc.get("sourceType").asText())
                .window(TumblingProcessingTimeWindows.of(
                        Time.milliseconds(parameter.getLong("max-time", 3000L)))
                )
                .trigger(PurgingCountTimeLimitTrigger.of(parameter.getLong("max-count", 10000L)))
                .process(new WindowSmartIndexer());

        env.execute("Fsec Smart Solr indexer");
    }


}
