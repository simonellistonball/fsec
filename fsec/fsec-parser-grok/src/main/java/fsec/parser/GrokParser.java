package fsec.parser;

import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import oi.thekraken.grok.api.Grok;
import oi.thekraken.grok.api.Match;
import oi.thekraken.grok.api.exception.GrokException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class GrokParser implements Parser {
    private static final Logger LOG = LoggerFactory.getLogger(GrokParser.class);
    private Grok grok;

    @Override
    public void config(Struct config) {
        grok = new Grok();
        try {
            grok.addPatternFromReader(getFile("/common.grok"));
            grok.addPatternFromReader(getFile("/" + config.getFieldsOrThrow("file").getStringValue()));
            String grokPattern = "%{" + config.getFieldsOrThrow("pattern").getStringValue() + "}";
            grok.compile(grokPattern);
        } catch (GrokException e) {
            LOG.error("Grok config failed", e);
        }
    }

    private Reader getFile(String file) {
        return new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream(file)));
    }

    @Override
    public Message parse(byte[] input, Message context) throws RuntimeException {
        Message.Builder mb = Message.newBuilder();
        String ins = new String(input, StandardCharsets.UTF_8);
        Match gm = grok.match(ins);
        gm.captures();
        Map<String, Object> stringObjectMap = gm.toMap();
        stringObjectMap.entrySet().forEach((e) -> {
            if (e.getValue() != null) {
                mb.putValues(e.getKey(), e.getValue().toString());
            }
        });

        return mb.build();
    }

    @Override
    public List<String> provides() {
        return Collections.unmodifiableList(new ArrayList(grok.getNamedRegexCollection().values()));
    }
}
