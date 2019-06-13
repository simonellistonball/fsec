package fsec

case class ParserLinkConfig(
    parser: String, 
    config: Map[String, Object]
)

case class FieldTransformationConfig(
    transformer: String, 
    config: Map[String, Object]
)

case class FilterConfig(
                         name: String,
                         filterClass: Class[Filter]
                       )

case class ParserConfig(
    name: String, 
    inputTopic: String, 
    outputTopic: String = Constants.ENRICHMENT_TOPIC,
    invalidTopic: Option[String] = None,
    errorTopic: Option[String] = None,
    parseChain: List[ParserLinkConfig],
    fieldTransformations: List[FieldTransformationConfig],
    filter: Option[String] = None,
    filterConfig: Option[FilterConfig] = None
)

