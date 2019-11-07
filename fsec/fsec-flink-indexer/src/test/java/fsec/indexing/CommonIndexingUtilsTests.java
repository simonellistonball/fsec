package fsec.indexing;


import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.JsonNode;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Test;
import sun.jvm.hotspot.utilities.Assert;

import java.util.Properties;

import static fsec.indexing.CommonIndexingUtils.CONFIG_KEY_FIELDS_TO_REMOVE;

public class CommonIndexingUtilsTests {
    @Test
    public void testMapFunctionShouldRemoveFields() throws Exception {
        Properties config = new Properties();
        config.setProperty(CONFIG_KEY_FIELDS_TO_REMOVE, "test.*|anti.*");
        JsonNode tree = new ObjectMapper().readTree("{ \"test\": 0 }");
        ObjectNode input = (ObjectNode) new ObjectMapper().readTree("{ \"antipattern\": \"test\", \"notTest\": 1, \"test\": 0 }");

        MapFunction<ObjectNode, ObjectNode> mapper = CommonIndexingUtils.projectionFunction(config);

        Assert.that(!mapper.map(input).has("test"), "Test field should be removed");
        Assert.that(!mapper.map(input).has("test2"), "test2 field should be removed");
        Assert.that(!mapper.map(input).has("antipattern"), "antipattern field should be removed");

        Assert.that(mapper.map(input).has("notTest"), "notTest field should not be removed");

        Assert.that(mapper.map(input).size() == 1, "Should only have one field left");
    }
}
