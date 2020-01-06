package fsec.parser;

import com.github.palindromicity.syslog.SyslogParser;
import com.google.protobuf.Struct;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class BaseSyslogParser implements Parser {
    protected abstract SyslogParser getParser();

    @Override
    public void config(Struct config) {}

    @Override
    public Message parse(byte[] input, Message m) throws RuntimeException {
        Map<String, String> output = getParser().parseLine(new String(input)).entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> (String) e.getValue()));
        return Message.newBuilder().putAllValues(output).build();
    }

}
