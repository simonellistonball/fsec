package fsec.parser;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class ParsedMessage {
    @Getter private boolean error;
    @Getter private String errorMessage;
    @Getter private List<String> invalidationMessages;

    public void setInvalidationMessages(List<String> invalidationMessages) {
        this.invalidationMessages = invalidationMessages;
    }

    public boolean isInvalid() { return invalidationMessages.size() > 0; }
    @Getter private Message message;

}
