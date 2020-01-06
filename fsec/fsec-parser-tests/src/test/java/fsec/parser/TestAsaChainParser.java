package fsec.parser;

import com.google.protobuf.ByteString;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import com.google.protobuf.util.JsonFormat;
import fsec.parser.config.ParserChainLink;
import fsec.parser.config.SensorConfig;
import org.junit.Test;

import javax.script.ScriptEngine;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertFalse;

public class TestAsaChainParser {

    @Test
    public void testAsaParser() {
        SensorConfig config = SensorConfig.newBuilder()
                .addParserChain(
                        ParserChainLink.newBuilder().setParser(Syslog3164Parser.class.getCanonicalName())
                                .setConfig(
                                        Struct.newBuilder().putFields("strict", Value.newBuilder().setBoolValue(false).build()))
                                .build()
                )
                .addParserChain(ParserChainLink.newBuilder()
                        .setParser(AsaParser.class.getCanonicalName())
                        .setPreserveSource(true)
                        .setSource("syslog.message").build())
                .build();

        ChainParser parser = new ChainParser(config);
        //ParsedMessage parsedMessage = parser.parse("<174>Jan  5 14:52:35 10.22.8.212 %ASA-6-302013: Built inbound TCP connection 76245503 for outside:10.22.8.233/54209 (10.22.8.233/54209) to inside:198.111.72.238/443 (198.111.72.238/443) (user.name)".getBytes());
        ParsedMessage parsedMessage = parser.parse("<166>Jan  5 09:52:35 10.22.8.12 %ASA-6-302014: Teardown TCP connection 17604999 for outside:209.111.72.151/443 to inside:10.22.8.188/64307 duration 0:00:30 bytes 6370 TCP FINs".getBytes(StandardCharsets.UTF_8));

        assertFalse(parsedMessage.isError());
        Map<String, String> map = parsedMessage.getMessage().getValuesMap();

        assertThat(map, hasEntry("syslog.header.timestamp", "Jan  5 14:52:35"));
        assertThat(map, hasEntry("asa.identifier", "ASA-6-302013"));
        assertThat(map, hasEntry("asa.message", "Built inbound TCP connection 76245503 for outside:10.22.8.233/54209 (10.22.8.233/54209) to inside:198.111.72.238/443 (198.111.72.238/443) (user.name)"));

        assertThat(parsedMessage.getMessage().getOriginal().toStringUtf8(), not(isEmptyString()));
    }

    @Test
    public void testFullAsaParser() throws IOException {
        SensorConfig.Builder builder = SensorConfig.newBuilder();

        JsonFormat.parser().merge(new InputStreamReader(
                this.getClass().getResourceAsStream("/router.test.json")), builder);

        ChainParser parser = new ChainParser(builder.build());
        ParsedMessage parsedMessage = parser.parse("<174>Jan  5 14:52:35 10.22.8.212 %ASA-6-302013: Built inbound TCP connection 76245503 for outside:10.22.8.233/54209 (10.22.8.233/54209) to inside:198.111.72.238/443 (198.111.72.238/443) (user.name)".getBytes());
        assertFalse(parsedMessage.isError());
        Map<String, String> map = parsedMessage.getMessage().getValuesMap();

        assertThat(map, hasEntry("syslog.header.timestamp", "Jan  5 14:52:35"));
        assertThat(map, hasEntry("asa.identifier", "ASA-6-302013"));
        assertThat(map, hasEntry("asa.message", "Built inbound TCP connection 76245503 for outside:10.22.8.233/54209 (10.22.8.233/54209) to inside:198.111.72.238/443 (198.111.72.238/443) (user.name)"));
        assertThat(map, hasEntry("src_ip", "10.22.8.233"));
        assertThat(parsedMessage.getMessage().getOriginal().toStringUtf8(), not(isEmptyString()));
    }
}
