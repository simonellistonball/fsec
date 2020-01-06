package fsec.parser;

import com.google.protobuf.Descriptors;
import com.google.protobuf.MapEntry;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import fsec.parser.config.ParserChainLink;
import fsec.parser.config.SensorConfig;

import java.util.*;

public class Router implements Parser {
    Map<String, ChainParser> routes = new HashMap<>();
    private String field;

    @Override
    public void config(Struct config) {
        field = config.getFieldsOrThrow("route").getStringValue();

        config.getFieldsMap().entrySet().forEach((e) -> {
            if (!e.getKey().equals("route")) {
                routes.put(e.getKey(), buildChain(e.getValue().getStructValue().getFieldsOrThrow("parserChain")));
            }
        });
    }

    private ChainParser buildChain(Value value) {
        final SensorConfig.Builder builder = SensorConfig.newBuilder();
        value.getListValue().getValuesList().forEach(
                (link) -> {
                    Struct lStruct = link.getStructValue();
                    ParserChainLink chain = ParserChainLink.newBuilder()
                            .setParser(lStruct.getFieldsOrThrow("parser").getStringValue())
                            .setConfig(lStruct.getFieldsOrDefault("config", null).getStructValue()).build();
                    builder.addParserChain(chain);
                }
        );

        ChainParser newChain = new ChainParser(builder.build());
        return newChain;
    }

    @Override
    public Message parse(byte[] input, Message m) throws RuntimeException {
        String route = m.getValuesOrDefault(this.field, "");
        if (route.isEmpty()) {
            throw new IllegalArgumentException(String.format("Route field %s not found in message", this.field));
        }
        Optional<ChainParser> first = routes.entrySet().stream().filter((k) -> route.matches(k.getKey())).map(t -> t.getValue()).findFirst();

        ParsedMessage parsed = first.get().parse(input);
        return parsed.getMessage();
    }

    @Override
    public List<String> provides() {
        return Collections.emptyList();
    }
}
