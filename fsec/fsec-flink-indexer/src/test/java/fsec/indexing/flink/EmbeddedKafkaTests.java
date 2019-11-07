package fsec.indexing.flink;

import fsec.indexing.EmbeddedSolrComponent;
import fsec.indexing.EmbeddedYarnComponent;
import org.apache.flink.api.common.restartstrategy.RestartStrategies;
import org.apache.flink.runtime.testutils.MiniClusterResourceConfiguration;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.test.util.MiniClusterWithClientResource;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;


public class EmbeddedKafkaTests {
    private static final Logger LOG = LoggerFactory.getLogger(EmbeddedKafkaTests.class);

    private EmbeddedKafkaComponent embeddedKafkaComponent;
    private EmbeddedSolrComponent embeddedSolrComponent;
    private EmbeddedYarnComponent embeddedYarnComponent;

    @ClassRule
    public static MiniClusterWithClientResource flinkCluster =
            new MiniClusterWithClientResource(
                    new MiniClusterResourceConfiguration.Builder()
                            .setNumberSlotsPerTaskManager(2)
                            .setNumberTaskManagers(1)
                            .build());

    @Before
    public void setUp() throws IOException {
        embeddedKafkaComponent = new EmbeddedKafkaComponent();
        embeddedKafkaComponent.start();
        embeddedSolrComponent = new EmbeddedSolrComponent();
        embeddedSolrComponent.start();
    }

    @After
    public void tearDown() throws IOException {
        embeddedKafkaComponent.shutdown();
        embeddedSolrComponent.shutdown();
    }

    //@Test
    public void testSendingMessagesEndToEnd() {

    }

    @Test
    public void testSolrSmartIndexer() throws Exception {
        embeddedKafkaComponent.createTopic("indexing");

        // run messages into kafka
        ProducerRecord<String, TestDocument> doc =
        new ProducerRecord<>("indexing", "test", new TestDocument(UUID.randomUUID().toString(), "test"));

        Producer<String, TestDocument> producer = createProducer(embeddedKafkaComponent.getBootstrap());

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                producer.send(new ProducerRecord<>("indexing", "test", new TestDocument(UUID.randomUUID().toString(), "test")));
            }
        }, 500);

        timer.schedule(new TimerTask() {
                           public void run() {
                               for (int i =0 ; i < 8 ; i++) {
                                   producer.send(new ProducerRecord<>("indexing", "test", new TestDocument(UUID.randomUUID().toString(), "test", i)));
                               }
                           }
                       }, 1100);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {

            }
        }, 1500);

        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.getConfig().setRestartStrategy(RestartStrategies.noRestart());
        Runnable job = new Runnable() {
            @Override
            public void run() {
                try {
                    SolrSmartIndexingJob.main(new String[]{"--parallelism", "2", "--bootstrap-server", embeddedKafkaComponent.getBootstrap(), "--max-count", "3", "--max-time", "1000"});
                } catch (Exception e) {
                }
            }
        };
        Thread jobThread = new Thread(job);
        jobThread.start();
        jobThread.join(10000);
        //jobThread.interrupt();
    }

    public static Producer<String, TestDocument> createProducer(String bootstrapServer) {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServer);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, TestDocumentJsonSerializer.class.getName());
        return new KafkaProducer<String, TestDocument>(props);
    }

    public static class TestDocumentJsonSerializer implements Serializer<TestDocument> {
        private ObjectWriter writer;

        @Override
        public void configure(Map<String, ?> map, boolean b) {
            writer = new ObjectMapper().writerFor(TestDocument.class);
        }

        @Override
        public byte[] serialize(String s, TestDocument testDocument) {
            try {
                return writer.writeValueAsBytes(testDocument);
            } catch (JsonProcessingException e) {
                return "".getBytes();
            }
        }

        @Override
        public void close() {
            writer = null;
        }
    }

    private class TestDocument {
        public String id;
        public String sourceType;
        public int index;

        public TestDocument(String id, String sourceType, int i) {
            this.id = id;
            this.sourceType = sourceType;
            this.index = i;
        }
        public TestDocument(String id, String sourceType) {
            this.id = id;
            this.sourceType = sourceType;
        }
    }
}
