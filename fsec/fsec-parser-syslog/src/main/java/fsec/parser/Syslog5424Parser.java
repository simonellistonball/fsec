package fsec.parser;

import com.github.palindromicity.syslog.SyslogParser;
import com.github.palindromicity.syslog.SyslogParserBuilder;
import com.github.palindromicity.syslog.SyslogSpecification;

import java.util.Collections;
import java.util.List;

public class Syslog5424Parser extends BaseSyslogParser {
    private SyslogParser _parser;
    @Override
    protected SyslogParser getParser() {
        if (_parser == null) {
            _parser = new SyslogParserBuilder().forSpecification(SyslogSpecification.RFC_5424).build();
        }
        return _parser;
    }

    @Override
    public List<String> provides() {
        return Collections.emptyList();
    }

}
