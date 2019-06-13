package fsec.parser

import fsec.{FSecMessage, ParserConfig}

class Asa extends Parser {

    def identifier(str: Array[Byte]) {
        // pull our the header and the tag
        //Map({ ciscotag -> ""})
    }

    def messagerouter(message:FSecMessage) {
        //val config2 = config.get(message["ciscotag"])
        // run parsing for this config 
    }

    override def config: Option[ParserConfig] = ???

    override def parse(str: Array[Byte]): FSecMessage = ???
}