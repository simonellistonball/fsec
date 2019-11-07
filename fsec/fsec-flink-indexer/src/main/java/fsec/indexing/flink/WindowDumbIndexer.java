package fsec.indexing.flink;

import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.functions.windowing.ProcessWindowFunction;
import org.apache.flink.streaming.api.functions.windowing.WindowFunction;
import org.apache.flink.streaming.api.windowing.windows.TimeWindow;
import org.apache.flink.streaming.api.windowing.windows.Window;
import org.apache.flink.util.Collector;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpRequest;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrRequest;
import org.apache.solr.client.solrj.request.UpdateRequest;
import org.apache.solr.common.SolrInputDocument;

import java.io.*;
import java.net.URI;
import java.util.Iterator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class WindowDumbIndexer extends ProcessWindowFunction<Tuple2<String, byte[]>, Long, String, TimeWindow> {
    private static HttpClient client = HttpClients.createDefault();

    /**
     * Take all the byte arrays from messages, and put them together into a json array, while assuming they are
     * actually json themselves. Send this to a solr REST endpoint to update documents.
     *
     * Note that very little parsing or checking is done at any point, so there is a good chance batches may fail
     * but we are being optimistic about the point of failure, and assuming the data on kafka is mostly good.
     *
     * If failures do come back from Solr, we will have to write some error handling code ourselves to as they will
     * otherwise be lost.
     *
     * TODO - this is not the most memory efficient way to do it, sending the arrays without copies would make sense
     *
     * @param collection
     * @param context
     * @param iterable
     * @param out
     * @throws Exception
     */
    @Override
    public void process(String collection, Context context, Iterable<Tuple2<String, byte[]>> iterable, Collector<Long> out) throws Exception {
        // send the iterable to the indexing client
        URI url = URI.create("http://solr:8083/" + collection + "/update");

        // this assumes that all the byte arrays are well behaved json, and so we avoid having to parse them

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        os.write("[".getBytes());
        Iterator<Tuple2<String, byte[]>> iterator = iterable.iterator();
        while (iterator.hasNext()) {
            os.write(iterator.next().f1);
            os.write(',');
        }
        // replace last byte with close
        byte[] output = os.toByteArray();
        if (output.length == 1) throw new IllegalArgumentException("No documents in window");

        output[output.length - 1] = ']';

        HttpPost post = new HttpPost(url);
        post.setEntity(new ByteArrayEntity(output));

        client.execute(post);
    }
}
