package fsec.normalizers;

import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import com.google.protobuf.util.Values;
import fsec.parser.Message;

import java.util.List;
import java.util.stream.Collectors;

public class FixDates implements Normalizer {
    private static Value DEFAULT_DATEFORMAT_VALUE = Values.of("yyyy-MM-dd MM:hh:ss Z");

    @Override
    public Message run(Message input) {
        return null;
    }

    @Override
    public void config(Struct config) {
        List<String> fields = config.getFieldsOrThrow("fields").getListValue().getValuesList().stream().map(v -> v.getStringValue()).collect(Collectors.toList());
        config.getFieldsOrDefault("format", DEFAULT_DATEFORMAT_VALUE);
        try {
            config.getFieldsOrThrow("timezone");
        } catch(Exception e) {

        }
    }

    @Override
    public List<SchemaChange> schemaImpact() {
        return null;
    }
}
