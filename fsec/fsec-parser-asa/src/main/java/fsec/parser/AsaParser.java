package fsec.parser;

import com.google.protobuf.Struct;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.AbstractMap;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AsaParser implements Parser {
    private final Pattern tagPattern = Pattern.compile("^%(ASA-\\d-\\d{6}): (.*)$");

    @Override
    public void config(Struct config) {}

    @Override
    public Message parse(byte[] input, Message m) throws RuntimeException {
        String s = new String(input, StandardCharsets.UTF_8);
        boolean test = s.matches("^%(ASA-\\d-\\d{6}): (.*)$");
        Matcher matches = tagPattern.matcher(s);
        matches.matches();

        return Message.newBuilder().putAllValues(
                Collections.unmodifiableMap(Stream.of(
                        new AbstractMap.SimpleEntry<String, String>("asa.identifier", matches.group(1)),
                        new AbstractMap.SimpleEntry<String, String>("asa.message", matches.group(2)))
                        .collect(Collectors.toMap((e) -> e.getKey(), (e) -> e.getValue())))
        ).build();
    }

    @Override
    public List<String> provides() {
        return Collections.unmodifiableList(Arrays.asList("asa.identifier", "asa.message"));
    }
}
