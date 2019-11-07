package fsec.indexing;

import org.apache.flink.api.common.functions.FilterFunction;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.shaded.jackson2.com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class CommonIndexingUtils {
    public static final String CONFIG_KEY_FIELDS_TO_REMOVE = "fieldsToRemove";
    public static final String CONFIG_KEY_FILTER_RULES = "filterRules";

    public static MapFunction<ObjectNode, ObjectNode> projectionFunction(Properties config) {
        return (in) -> {
            String filterRe = config.getProperty(CONFIG_KEY_FIELDS_TO_REMOVE);
            if (filterRe != null) {
                List<String> remove = new ArrayList<String>();
                in.fieldNames().forEachRemaining(n-> {
                    if (n.matches(filterRe)) {
                        remove.add(n);
                    }
                });
                in.remove(remove);
            }
            return in;
        };
    }

    public static FilterFunction<ObjectNode> filterFunction(Properties config) {
        return (in) -> {
            String rules = config.getProperty(CONFIG_KEY_FILTER_RULES);
            if (rules == null) return true;

            // apply any of the rules

            return true;
        };
    }
}
