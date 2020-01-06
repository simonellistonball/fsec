package fsec.indexing;

import fsec.indexing.flink.PurgingCountTimeLimitTrigger;
import org.apache.solr.client.solrj.embedded.EmbeddedSolrServer;
import org.apache.solr.core.CoreContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class EmbeddedSolrComponent {
    private static final Logger LOG = LoggerFactory.getLogger(PurgingCountTimeLimitTrigger.class);

    private EmbeddedSolrServer server;
    private CoreContainer container;

    public void start() {
        container = new CoreContainer("src/test/resources/solr");
        container.load();
        server = new EmbeddedSolrServer(container, "test");

        LOG.info("Created embedded Solr");
    }

    public void shutdown() throws IOException {
        server.close();
    }

    public EmbeddedSolrServer getServer() {
        return server;
    }
}
