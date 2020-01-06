package fsec.parser;

import com.github.daniel.shuy.kafka.protobuf.serde.KafkaProtobufSerde;
import fsec.parser.config.*;
import kong.unirest.Unirest;
import org.apache.commons.cli.*;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.errors.LogAndContinueExceptionHandler;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;

import java.util.Properties;

public class App {

    public static void main(String[] args) {
        // parse the arguments for a sensor name
        Options options = new Options();
        options.addRequiredOption("n","name", true, "Name of sensor to run");
        options.addOption("c", "config-url", true, "Base URL for the config API");

        CommandLineParser parser = new DefaultParser();
        CommandLine cmd = null;
        try {
            cmd = parser.parse( options, args);
        } catch (ParseException e) {
            System.err.println("Invalid options Reason: " + e.getMessage());
            HelpFormatter formatter = new HelpFormatter();
            formatter.printHelp( "Parser", options );
        }

        String sensorName = cmd.getOptionValue("n");

        String configUrl = "https://config/api/v1";
        if (cmd.hasOption("c")) {
            configUrl = cmd.getOptionValue("c");
        }

        final SensorConfig config = getConfig(sensorName, configUrl);

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "fsec-parser-" + config.getName());
        props.put(StreamsConfig.CONSUMER_PREFIX, "fsec-parser-" + config.getName());
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, "exactly_once");
        // the parsing infrastructure should handle deserialization failures itself and swallow exceptions, but if it
        // does fail we should log and keep the topologies going,.
        props.put(StreamsConfig.DEFAULT_DESERIALIZATION_EXCEPTION_HANDLER_CLASS_CONFIG, LogAndContinueExceptionHandler.class);

        // TODO enforce proper metrics reporters for the system to capture all the output rates

        // TODO setup the consumer and producer properties (allow these to be set via input files and service)

        // main kafka topics
        final String inputTopic = config.getInputTopic();
        final String outputTopic = config.getOutputTopic();
        final String errorTopic = config.getErrorTopic();
        final String invalidTopic = config.getInvalidTopic();

        // Setup KStreams to ingest, using the serdes to handle parsing
        StreamsBuilder builder = new StreamsBuilder();
        @SuppressWarnings("unchecked") KStream<String, ParsedMessage>[] outputs = builder.stream(
                inputTopic,
                Consumed.with(Serdes.String(), parser(config)))
                .branch(
                        (k, v) -> v.isError(),
                        (k, v) -> v.isInvalid(),
                        (k, v) -> true
                );
        // send the outputs to their appropriate topics
        outputs[0].mapValues(v -> Error.newBuilder()
                .setError(v.getErrorMessage())
                .build())
                .to(errorTopic, Produced.with(Serdes.String(), errorSerde()));
        outputs[1].mapValues(v -> Invalid.newBuilder()
                .setMessage(v.getMessage())
                .addAllValidationError(v.getInvalidationMessages())
                .build())
                .to(invalidTopic, Produced.with(Serdes.String(), invalidSerde()));
        outputs[2].mapValues(ParsedMessage::getMessage).to(outputTopic, Produced.with(Serdes.String(), serde()));

        // make it run
        Topology topology = builder.build();
        KafkaStreams streams = new KafkaStreams(topology, props);
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }

    /**
     * Grab parser config from the config REST service
     */
    private static SensorConfig getConfig(String sensorName, String configUrl) {
        return Unirest.get(configUrl + "/sensor/" + sensorName).asObject(SensorConfig.class).getBody();
    }

    /**
     * A parser driven serde transforming bytes to Message objects
     *
     * @param config
     * @return
     */
    private static Serde<ParsedMessage> parser(SensorConfig config) {
        return new Serde<ParsedMessage>() {
            @Override
            public Serializer<ParsedMessage> serializer() {
                throw new IllegalStateException("Should not serialize ParsedMessage as it is a temporary state object, use Message instead");
            }

            @Override
            public Deserializer<ParsedMessage> deserializer() {
                return new KafkaParser(config);
            }
        };
    }

    /**
     * Output protobuf serde for messages
     *
     * @return
     */
    private static Serde<Message> serde() {
        return new KafkaProtobufSerde<>(Message.parser());
    }

    /**
     * Output protobuf serde for Errors
     *
     * @return
     */
    private static Serde<Error> errorSerde() {
        return new KafkaProtobufSerde<>(Error.parser());
    }

    /**
     * Output protobuf serde for invalid message reports
     *
     * @return
     */
    private static Serde<Invalid> invalidSerde() {
        return new KafkaProtobufSerde<>(Invalid.parser());
    }

}