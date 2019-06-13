/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package fsec

import java.util.Properties

import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.connectors.kafka._
import fsec._
import org.apache.flink.api.common.functions.{MapFunction, RichMapFunction}
import org.apache.flink.api.common.serialization.SimpleStringSchema

object StreamingJob {
  
  def validate(event: FSecMessage) {
    event
  }

  def normalize(event: FSecMessage) {
    event
  }

  class transform(fieldTransformationConfig: List[FieldTransformationConfig]) extends RichMapFunction[FSecMessage,FSecMessage] {
    def map(in: FSecMessage): FSecMessage = ???
  }

  def transform(fieldTransformation: List[FieldTransformationConfig]):MapFunction[FSecMessage, FSecMessage] = {
    new transform(fieldTransformation);
  }
  def config() {}

  def fieldTransformationConfig(): List[FieldTransformationConfig] = ???

  def kafkaSink(topic:String, brokers:String):FlinkKafkaProducer[FSecMessage] = {
    new FlinkKafkaProducer[FSecMessage](
      brokers,
      topic,
      new JSONSerializationSchema());
  }

  def makeLink(link: ParserLinkConfig): MapFunction[FSecMessage,FSecMessage] {
    // return a map function for the link config

  }

  def main(args: Array[String]) {
    // set up the streaming execution environment
    val env = StreamExecutionEnvironment.getExecutionEnvironment

    val config = new ParserConfig()
    val parser_name = config.get("name")
    val topic = config.get("inputTopic")


    val properties = new Properties()
    properties.setProperty("bootstrap.servers", "localhost:9092")
    properties.setProperty("group.id", "test")

    val events = env.addSource(new FlinkKafkaConsumer[FSecMessage](topic, new SimpleStringSchema(), properties))
    // do each thing in the chain of the config
    val parsed = config.parseChain.foldLeft(events){(chain, link) => chain.map(makeLink(link))}

    val results = parsed
      // execute field transformations and normalisations
      .map(transform(fieldTransformationConfig()))
      .map(x => normalize(x))

    // record the errors
    results.filter(x => x.error)
      .addSink(kafkaSink(config.getOrElse("errorTopic", parser_name + "_errors")))

    // continue with non-errors
    val correctResults = result.filter(_ => !_.error)

    correctResults.filter(_ => _.valid)
      .addSink(kafkaSink(config.getOrElse("outputTopic", parser_name + "_parsed")))
    correctResults.filter(_ => !_.valid)
      .addSink(kafkaSink(config.getOrElse("invalidTopic", parser_name + "_invalid")))

    // execute program
    env.execute("fsec parser " + parser_name)
  }
}
