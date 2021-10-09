from core.models import DataType

DATA_TYPE_MAPPER = {
    'DATE': DataType.DATE,
    'STRING': DataType.STR,
    'NUMBER': DataType.FLOAT,
    'BOOLEAN': DataType.BOOL,
}
