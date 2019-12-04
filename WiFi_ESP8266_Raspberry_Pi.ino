// Import required libraries
#include "ESP8266WiFi.h"
#include <aREST.h>
#include "DHTesp.h"

// DHT11 sensor pins
#define DHTPIN D3
DHTesp dht;

// Create aREST instance
aREST rest = aREST();

// Initialize DHT sensor

// WiFi parameters
const char* ssid = "iPhone";
const char* password = "1234567890";

// The port to listen for incoming TCP connections 
#define LISTEN_PORT           80

// Create an instance of the server
WiFiServer server(LISTEN_PORT);

// Variables to be exposed to the API
float temperature;
float humidity;

void setup(void)
{  
  // Start Serial
  Serial.begin(115200);
  
  // Init DHT 
  dht.setup(DHTPIN, DHTesp::DHT11);
  
  // Init variables and expose them to REST API
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);
    
  // Give name and ID to device
  rest.set_id("1");
  rest.set_name("sensor_module");
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
  
  // Print the IP address
  Serial.println(WiFi.localIP());
  
}

void loop() {
  
  // Reading temperature and humidity
  if (!isnan(dht.getTemperature()))temperature = dht.getTemperature();
  
  if (!isnan(dht.getHumidity()))humidity = dht.getHumidity();
  Serial.println(temperature);
  Serial.println(humidity);
  delay(dht.getMinimumSamplingPeriod());
  // Handle REST calls
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
  while(!client.available()){
    delay(1);
  }
  rest.handle(client);
 
}
