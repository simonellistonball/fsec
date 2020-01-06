package fsec.parser;

import com.google.protobuf.ByteString;
import com.google.protobuf.Struct;
import fsec.parser.config.ParserChainLink;
import fsec.parser.config.SensorConfig;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;

public class ChainParser {
    private SensorConfig config;
    private List<ChainFunctions> chain = new LinkedList<>();
    private boolean initialized = false;

    public ChainParser(SensorConfig config) {
        super();
        this.config = config;
    }

    protected class ChainFunctions {
        private final Function<Message, Message> fn;
        private final BiFunction<Message, Message, Message> merger;

        ChainFunctions(Function<Message, Message> fn, BiFunction<Message, Message, Message> merger) {
            this.fn = fn;
            this.merger = merger;
        }

        Message run(Message input) {
            return merger.apply(input, fn.apply(input));
        }
    }

    private void initialize() {
        if (initialized) return;
        int index = 0;
        for (ParserChainLink i : config.getParserChainList()) {
            String parserName = i.getParser();
            String sourceField = i.getSource();
            Boolean preserveSource = i.getPreserveSource() || index == 0;
            index++;

            // create an instance of the parser class wrapped to handle chain position (i.e. feed the right input source and merge the output right
            Parser parser = parserInstance(parserName, i.getConfig(), sourceField, preserveSource);

            // if it has a source specified, pass that field from the current message, else the raw bytes
            Function<Message, Message> fn = sourceField.isEmpty() ?
                    (m -> parser.parse(m.getOriginal().toByteArray(), m)) :
                    (m -> parser.parse(m.getValuesOrThrow(sourceField).getBytes(StandardCharsets.UTF_8), m));
            // if it says preserve source, merge results, otherwise replace previous results
            BiFunction<Message, Message, Message> merger = (message, message2) ->
                    preserveSource ?
                            Message.newBuilder().mergeFrom(message).mergeFrom(message2).build() :
                            message2;
            chain.add(new ChainFunctions(fn, merger));
        }
        initialized = true;
    }

    private Parser parserInstance(String parserName, Struct config, String sourceField, Boolean preserveSource) {
        try {
            Class parserClass = new ParserClassLoader(this.getClass().getClassLoader()).loadClass(parserName);
            Parser parser = (Parser) parserClass.newInstance();
            parser.config(config);
            return parser;
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public ParsedMessage parse(byte[] bytes) {
        try {
            Message initialMessage = Message.newBuilder().setOriginal(ByteString.copyFrom(bytes)).build();
            if (!initialized)
                this.initialize();

            // iterate the chain feeding the initial message in
            Message input = initialMessage;
            for (ChainFunctions i : chain) {
                input = i.run(input);
            }
            return ParsedMessage.builder().message(input).invalidationMessages(validate(input)).build();
        } catch (Exception e) {
            return ParsedMessage.builder().error(true).errorMessage(e.getMessage()).build();
        }
    }

    public List<String> validate(Message message) {
        List messages = new ArrayList<String>();
        if (message.getTimestamp() == 0) {
            messages.add("Missing timestamp");
        }
        if (message.getOriginal().isEmpty()) {
            messages.add("Missing original");
        }
        // additional validations for the sensor itself

        // field type checks based on trait compliance

        return messages;
    }
}
