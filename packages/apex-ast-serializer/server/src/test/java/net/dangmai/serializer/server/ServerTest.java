package net.dangmai.serializer.server;

import static org.junit.jupiter.api.Assertions.*;

import java.io.*;
import net.dangmai.serializer.TestUtilities;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class ServerTest {

  @BeforeAll
  public static void startServer() throws Exception {
    Thread serverThread = new Thread(() -> {
      try {
        HttpServer.main(new String[] { "-p", "58867", "-s", "-a", "secret" });
      } catch (Exception ex) {
        throw new RuntimeException("Exception caught in lambda", ex);
      }
    });
    serverThread.start();
    Thread.sleep(3000); // so that the server can be brought up before tests are run
  }

  @Test
  void shouldGetJsonFromNamedApexFile() {
    assertDoesNotThrow(() -> {
      File file = TestUtilities.getApexTestFile("AnnotatedClass.cls");
      String content = TestUtilities.postRequest(
        TestUtilities.createJsonRequest("json", false, file)
      );
      assertNotNull(content, "There should be content");
      assertTrue(
        TestUtilities.isJSONValid(content),
        "Content should be valid JSON"
      );
    });
  }

  @Test
  void shouldGetJsonFromAnonymousApexFile() {
    assertDoesNotThrow(() -> {
      File file = TestUtilities.getApexTestFile("AnnotatedClass.cls");
      String content = TestUtilities.postRequest(
        TestUtilities.createJsonRequest("json", true, file)
      );
      assertNotNull(content, "There should be content");
      assertTrue(
        TestUtilities.isJSONValid(content),
        "Content should be valid JSON"
      );
    });
  }
}
