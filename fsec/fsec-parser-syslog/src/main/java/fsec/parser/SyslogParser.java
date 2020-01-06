package fsec.parser;

import com.github.palindromicity.syslog.SyslogParserBuilder;
import com.github.palindromicity.syslog.SyslogSpecification;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SyslogParser implements Parser {
    private static final Value DEFAULT_SPEC = Value.newBuilder().setStringValue(SyslogSpecification.RFC_3164.name()).build();
    private SyslogSpecification spec;

    protected com.github.palindromicity.syslog.SyslogParser getParser() {
        return new SyslogParserBuilder().forSpecification(spec).build();
    };

    @Override
    public void config(Struct config) {
        this.spec = SyslogSpecification.valueOf(config.getFieldsOrDefault("spec", DEFAULT_SPEC).getStringValue());
    }

    @Override
    public Message parse(byte[] input, Message m) throws RuntimeException {
        Map<String, String> output = getParser().parseLine(new String(input)).entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> (String) e.getValue()));
        return Message.newBuilder().putAllValues(output).build();
    }

    @Override
    public List<String> provides() {
        return Collections.emptyList();
    }
}