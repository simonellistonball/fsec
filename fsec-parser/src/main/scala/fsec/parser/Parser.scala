package fsec.parser

import fsec._

abstract class Parser {
    def config: Option[ParserConfig]
    def parse(str: Array[Byte]):FSecMessage
}