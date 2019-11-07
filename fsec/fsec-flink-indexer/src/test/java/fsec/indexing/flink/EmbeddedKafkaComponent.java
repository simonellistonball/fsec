package fsec.indexing.flink;

import kafka.server.KafkaConfig;
import kafka.server.KafkaServer;
import kafka.utils.MockTime;
import kafka.utils.TestUtils;
import kafka.utils.ZKStringSerializer$;
import kafka.zk.EmbeddedZookeeper;
import org.I0Itec.zkclient.ZkClient;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.CreateTopicsOptions;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.utils.Time;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class EmbeddedKafkaComponent {

    private KafkaServer kafkaServer;
    private static final String ZKHOST = "127.0.0.1";
    private static final String BROKERHOST = "127.0.0.1";
    private static final String BROKERPORT = "9092";
    private ZkClient zkClient;
    private EmbeddedZookeeper zkServer;

    public void start() throws IOException {
        zkServer = new EmbeddedZookeeper();
        String zkConnect = ZKHOST + ":" + zkServer.port();
        zkClient = new ZkClient(zkConnect, 30000, 30000, ZKStringSerializer$.MODULE$);

        Properties brokerProps = new Properties();
        brokerProps.setProperty("zookeeper.connect", zkConnect);
        brokerProps.setProperty("broker.id", "0");
        brokerProps.setProperty("log.dirs", Files.createTempDirectory("kafka-").toAbsolutePath().toString());
        brokerProps.setProperty("listeners", "PLAINTEXT://" + BROKERHOST + ":" + BROKERPORT);
        brokerProps.setProperty("offsets.topic.replication.factor", "1");
        KafkaConfig config = new KafkaConfig(brokerProps);
        Time mock = new MockTime();
        kafkaServer = TestUtils.createServer(config, mock);

        Map<String, Object> adminConf = new HashMap<>();
        adminConf.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERHOST + ":" + BROKERPORT);
        adminConf.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "5000");
    }

    public void shutdown() {
        kafkaServer.shutdown();
        zkClient.close();
        zkServer.shutdown();
    }

    public void createTopic(String name) {
        this.createTopic(name, 1, (short) 1);
    }

    public void createTopic(String name, int partitions, short replacationFactor) {
        Map<String, Object> adminConf = new HashMap<>();
        adminConf.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERHOST + ":" + BROKERPORT);
        adminConf.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "5000");

        AdminClient adminClient = AdminClient.create(adminConf);
        adminClient.createTopics(Collections.singleton(
                new NewTopic(name, 1, (short) 1)),
                new CreateTopicsOptions().timeoutMs(10000)).all();
    }

    public String getBootstrap() {
        return BROKERHOST + ":" + BROKERPORT;
    }
}
