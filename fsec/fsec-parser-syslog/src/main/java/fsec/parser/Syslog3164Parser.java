package fsec.parser;

import com.github.palindromicity.syslog.AllowableDeviations;
import com.github.palindromicity.syslog.SyslogParser;
import com.github.palindromicity.syslog.SyslogParserBuilder;
import com.github.palindromicity.syslog.SyslogSpecification;
import com.github.palindromicity.syslog.dsl.SyslogFieldKeys;

import java.util.Arrays;
import java.util.Collections;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;

public class Syslog3164Parser extends BaseSyslogParser {
    private SyslogParser _parser;
    static private final List<String> fields =
            Arrays.asList(
                    SyslogFieldKeys.HEADER_APPNAME,
                    SyslogFieldKeys.HEADER_HOSTNAME,
                    SyslogFieldKeys.HEADER_PRI_SEVERITY,
                    SyslogFieldKeys.HEADER_PRI_FACILITY,
                    SyslogFieldKeys.HEADER_TIMESTAMP,
                    SyslogFieldKeys.MESSAGE,
                    SyslogFieldKeys.HEADER_PROCID,
                    SyslogFieldKeys.HEADER_MSGID)
                    .stream().map(e -> e.getField()).collect(Collectors.toList());

    @Override
    protected SyslogParser getParser() {
        if (_parser == null) {
            _parser = new SyslogParserBuilder().forSpecification(SyslogSpecification.RFC_3164).withDeviations(EnumSet.of(AllowableDeviations.PRIORITY, AllowableDeviations.VERSION)).build();
        }
        return _parser;
    }

    @Override
    public List<String> provides() {
        return fields;
    }

}
