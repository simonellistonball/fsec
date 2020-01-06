package fsec.normalizers;

import lombok.Data;

@Data
public class SchemaChange {
    SchemaChangeType type;
    String field;

}
