package fsec.indexing.flink;

import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.flink.streaming.api.functions.windowing.ProcessWindowFunction;
import org.apache.flink.streaming.api.windowing.windows.TimeWindow;
import org.apache.flink.util.Collector;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.ConcurrentUpdateSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class WindowSmartIndexer extends ProcessWindowFunction<ObjectNode, Long, String, TimeWindow> {
    private static final Logger LOG = LoggerFactory.getLogger(WindowSmartIndexer.class);

    @Override
    public void process(String collection, Context context, Iterable<ObjectNode> iterable, Collector<Long> collector) throws Exception {
        try {
            SolrClient client = new ConcurrentUpdateSolrClient.Builder("http://localhost:8983/solr/").build();
            UpdateResponse response = client.add(collection, objectToDocs(iterable).iterator());
        } catch (Exception e) {
            LOG.error("Solr update failed", e);
            throw (e);
        }
    }

    private static Stream<SolrInputDocument> objectToDocs(Iterable<ObjectNode> iterable) {
        return StreamSupport.stream(iterable.spliterator(), true).map(d -> objectToDoc(d));
    }

    private static SolrInputDocument objectToDoc(ObjectNode message) {
        SolrInputDocument doc = new SolrInputDocument();
        message.fields().forEachRemaining(f -> {
            doc.addField(f.getKey(), f.getValue().textValue());
        });
        return doc;
    }
}
