package fsec.parser;

import com.google.protobuf.Struct;
import fsec.parser.config.ParserChainLink;

import java.util.List;

public interface Parser {
    /**
     * Receive any relevant config as an arbitrary struct
     *
     * @param config
     */
    void config(Struct config);

    /**
     * Parse a stream of UTF8 encoded bytes into a message object
     */
    Message parse(byte[] input, Message context) throws RuntimeException;

    default Message parse(byte[] input) throws RuntimeException {
        return parse(input, null);
    }

    /**
     * List of the traits that the parser supports
     *
     * @return
     */
    List<String> provides();
}
