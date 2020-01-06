package fsec.parser;

import com.google.protobuf.ListValue;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import fsec.parser.config.NormalizeChainLink;
import fsec.parser.config.ParserChainLink;
import fsec.parser.config.SensorConfig;
import org.junit.Test;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertFalse;

public class TestSyslogParser {

    @Test
    public void testSyslog3164() {
        SensorConfig config = SensorConfig.newBuilder().addParserChain(
                ParserChainLink.newBuilder().setParser(Syslog3164Parser.class.getCanonicalName())
                        .setConfig(
                                Struct.newBuilder().putFields("strict", Value.newBuilder().setBoolValue(false).build()))
                        .build()
        ).build();

        ChainParser parser = new ChainParser(config);
        ParsedMessage parsedMessage = parser.parse("Nov  1 01:30:18 test syslogd[42]: Test message".getBytes());
        assertFalse(parsedMessage.isError());
        Map<String, String> map = parsedMessage.getMessage().getValuesMap();

        assertThat(map, hasEntry("syslog.header.hostName", "test"));
        assertThat(map, hasEntry("syslog.header.timestamp", "Nov  1 01:30:18"));

        assertThat(parsedMessage.isInvalid(), is(true));
        assertThat(parsedMessage.getInvalidationMessages(), contains("Missing timestamp"));
        assertThat(parsedMessage.getMessage().getOriginal().toStringUtf8(), not(isEmptyString()));
    }

    @Test
    public void testSyslog3164withDateNormals() {
        SensorConfig config = SensorConfig.newBuilder().addParserChain(
                ParserChainLink.newBuilder().setParser(Syslog3164Parser.class.getCanonicalName()).build()
        ).addNormalizerChain(
                NormalizeChainLink.newBuilder().setNormalizer("fsec.normalizer.FixDate")
                    .setConfig(
                        Struct.newBuilder()
                                .putFields("fields", Value.newBuilder().setListValue(
                                    ListValue.newBuilder().addValues(Value.newBuilder().setStringValue("syslog.header.timestamp").build()).build()
                                ).build())

                    .build())
                .build()
        ).build();

        ZonedDateTime targetDate = ZonedDateTime.now();
        String syslogDate = DateTimeFormatter.ofPattern("MMM  d HH:mm:ss", Locale.US ).format(targetDate);

        ChainParser parser = new ChainParser(config);
        ParsedMessage parsedMessage = parser.parse((syslogDate + " test syslogd[42]: Test message").getBytes());
        assertFalse(parsedMessage.isError());
        Map<String, String> map = parsedMessage.getMessage().getValuesMap();

        assertThat(map, hasEntry("syslog.header.timestamp", syslogDate));
        // check the timestamp has been set right, despite the current year missing from the message
        assertThat(parsedMessage.getMessage().getTimestamp(), equalTo(targetDate.toInstant().toEpochMilli()));
    }

}
