package fsec.indexing.flink;

import fsec.indexing.EmbeddedSolrComponent;
import fsec.indexing.EmbeddedYarnComponent;
import org.apache.flink.api.common.restartstrategy.RestartStrategies;
import org.apache.flink.runtime.testutils.MiniClusterResourceConfiguration;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.test.util.MiniClusterWithClientResource;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.ConcurrentUpdateSolrClient;
import org.apache.solr.client.solrj.request.UpdateRequest;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.restlet.engine.util.TemplateDispatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;

public class EmbeddedSolrTests {
    private static final Logger LOG = LoggerFactory.getLogger(EmbeddedSolrTests.class);

    private EmbeddedSolrComponent embeddedSolrComponent;

    @Before
    public void setUp() throws IOException {
        embeddedSolrComponent = new EmbeddedSolrComponent();
        embeddedSolrComponent.start();
    }

    @After
    public void tearDown() throws IOException {
        embeddedSolrComponent.shutdown();
    }

    @Test
    public void testSolr() throws IOException, SolrServerException {
        SolrClient client = new ConcurrentUpdateSolrClient.Builder("http://localhost:8983/solr/").build();

        UpdateRequest request = new UpdateRequest("test").add(new TestDocument(UUID.randomUUID().toString(), "test").asSolr());

        embeddedSolrComponent.getServer().request(request);
        embeddedSolrComponent.getServer().commit();
    }


    public static class TestDocumentJsonSerializer implements Serializer<EmbeddedSolrTests.TestDocument> {
        private ObjectWriter writer;

        @Override
        public void configure(Map<String, ?> map, boolean b) {
            writer = new ObjectMapper().writerFor(EmbeddedSolrTests.TestDocument.class);
        }

        @Override
        public byte[] serialize(String s, EmbeddedSolrTests.TestDocument testDocument) {
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

        public SolrInputDocument asSolr() {
            SolrInputDocument doc = new SolrInputDocument();
            doc.addField("id", id);
            doc.addField("sourceType", sourceType);
            doc.addField("index", index);
            return doc;
        }
    }

    private static SolrInputDocument objectToDoc(ObjectNode message) {
        SolrInputDocument doc = new SolrInputDocument();
        message.fields().forEachRemaining(f -> {
            doc.addField(f.getKey(), f.getValue().textValue());
        });
        return doc;
    }
}
