package fsec.normalizers;

import com.google.protobuf.Struct;
import fsec.parser.Message;

import java.util.List;

public interface Normalizer {

    Message run(Message input);

    void config(Struct config);

    List<SchemaChange> schemaImpact();
}
