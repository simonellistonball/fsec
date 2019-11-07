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

package fsec.indexing.flink;

import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer;

import java.util.Properties;

/**
 * Streaming job to group index entries by target collection based on header, and batch them by size with a maximum
 * time in buffer element, and then write them very fast to Solr
 *
 * Note this version makes no effort to parse or transform the content, but literally takes bytes from kafka and
 * puts them into a solr request.
 */
public class SolrDumbIndexingJob {

	public static void main(String[] args) throws Exception {
		// set up the streaming execution environment
		final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

		Properties properties = new Properties();
		properties.setProperty("bootstrap.servers", "localhost:9092");
		properties.setProperty("group.id", "solr_indexing");
		DataStream<Tuple2<String,byte[]>> stream = env
				.addSource(new FlinkKafkaConsumer<Tuple2<String,byte[]>>("indexing", new HeaderAndBytesSchema(), properties));

		// group stream by destination index, process every n seconds and trigger to early evict on a size
		// size should be self learning over time based on the total size of the messages to maintain
		// roughly equal window sizes
		stream.keyBy(t -> t.f0)
				.window(TumblingProcessingTimeWindows.of(Time.seconds(3)))
				.trigger(PurgingByteCountTrigger.of(5 * 1024 *1024))
				.process(new WindowDumbIndexer());

		env.execute("Fsec Fast Solr indexer");
	}
}
/*

.reduce(new ReduceFunction<Tuple2<String, byte[]>>() {
					@Override
					public Tuple2<String, byte[]> reduce(Tuple2<String, byte[]> t2, Tuple2<String, byte[]> t1) throws Exception {
						byte[] results = new byte[t1.f1.length + t2.f1.length + 1];
						System.arraycopy(t1.f1, 0, results, 0, t1.f1.length);
						System.arraycopy(t2.f1, 0, results, t1.f1.length  + 2, t2.f1.length);
						results[t1.f1.length + 1] = ',';
						return Tuple2.of(t1.f0, results);
					}
				})
 */