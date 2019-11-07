package fsec.indexing.flink;

import org.apache.commons.io.IOUtils;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.streaming.api.functions.windowing.ProcessWindowFunction;
import org.apache.flink.util.Collector;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static com.jayway.jsonpath.matchers.JsonPathMatchers.isJson;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.MatcherAssert.assertThat;

public class WindowDumbIndexerTests {

    private final Collector<Long> collectorMock = Mockito.mock(Collector.class);
    private final ProcessWindowFunction.Context contextMock = Mockito.mock(ProcessWindowFunction.Context.class);

    @Test
    public void testDumbIndexerCombinesDocuments() throws Exception {
        ArrayList<Tuple2<String, byte[]>> inputTuples = new ArrayList();
        inputTuples.add(Tuple2.of("test", "123".getBytes()));
        inputTuples.add(Tuple2.of("test", "456".getBytes()));

        runTest(inputTuples, "[123,456]");
    }


    @Test
    public void testDumbIndexerCombinesSingleDocument() throws Exception {
        ArrayList<Tuple2<String, byte[]>> inputTuples = new ArrayList();
        inputTuples.add(Tuple2.of("test", "123".getBytes()));

        runTest(inputTuples, "[123]");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDumbIndexerCombinesZeroDocument() throws Exception {
        ArrayList<Tuple2<String, byte[]>> inputTuples = new ArrayList();
        runTest(inputTuples, null);
    }

    @Test
    public void testDumbIndexerCombinesComplexDocument() throws Exception {

        ArrayList<TestDocument> docs = new ArrayList();
        docs.add(generateDocument());
        docs.add(generateDocument());

        ArrayList<Tuple2<String, byte[]>> inputTuples = new ArrayList();
        docs.forEach(d -> {
            try {
                inputTuples.add(Tuple2.of("test", new ObjectMapper().writeValueAsBytes(d)));
            } catch (JsonProcessingException e) {
            }
        });
        assertThat(inputTuples, hasSize(2));

        String result = runTest(inputTuples, null);

        assertThat(result, hasJsonPath("$[0].value", equalTo(docs.get(0).get("value"))));
        assertThat(result, hasJsonPath("$[1].value", equalTo(docs.get(1).get("value"))));
    }

    private TestDocument generateDocument() {
        TestDocument doc = new TestDocument();
        doc.put("value", UUID.randomUUID().toString());
        return doc;
    }

    private String runTest(Iterable<Tuple2<String, byte[]>> inputTuples, String expected) throws Exception {
        HttpClient mockHttp = Mockito.mock(HttpClient.class);
        when(mockHttp.execute(any(HttpPost.class))).thenReturn(null);
        ArgumentCaptor<HttpPost> captor = ArgumentCaptor.forClass(HttpPost.class);

        WindowDumbIndexer indexer = new WindowDumbIndexer();
        Field field = WindowDumbIndexer.class.getDeclaredField("client");
        field.setAccessible(true);
        field.set(indexer, mockHttp);

        indexer.process("test", contextMock, inputTuples, collectorMock);

        verify(mockHttp).execute(captor.capture());
        InputStream content = captor.getValue().getEntity().getContent();
        String outputString = IOUtils.toString(content, StandardCharsets.UTF_8);
        if (expected != null) {
            assertThat(outputString, equalTo(expected));
        }
        assertThat(outputString, isJson());
        return outputString;
    }

    private class TestDocument extends HashMap<String, String> {
    }
}
