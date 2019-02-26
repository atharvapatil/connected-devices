#include <SPI.h>
#ifdef ARDUINO_SAMD_MKR1000
#include <WiFi101.h>
#define WIFI_LIB "WiFi101"
#else
#include <WiFiNINA.h>
#define WIFI_LIB "WiFiNINA"
#endif

byte mac[6];

void setup() {
  Serial.begin(9600);

  // Wait for a serial connection
  while (!Serial) { }

  Serial.println("Using " + String(WIFI_LIB) + " for WiFi");
  
  Serial.print("Firmware version ");
  Serial.println(WiFi.firmwareVersion());

  WiFi.macAddress(mac);

  char address[18] = {0};
  sprintf(address,"%02X:%02X:%02X:%02X:%02X:%02X",mac[5],mac[4],mac[3],mac[2],mac[1],mac[0]);
  Serial.print("MAC ");
  Serial.println(address);
}

void loop () {}
