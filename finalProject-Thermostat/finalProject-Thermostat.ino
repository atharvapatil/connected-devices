/*
 * Final project code for Tom Igoe's Connected Devices & Networked interactions class
 * Date: 22 - 02 - 2019
 * Author: Atharva Patil
 * Documentation: https://www.thatworkedyesterday.com/blog?category=connected-devices
 */

#include <time.h>
#include <Scheduler.h>


// include the library code:
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(0, 1, 2, 3, 4, 5);

// Including the dependant libraries
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>

// Senstive authentication data to post and access data to tigoe.io server
#include "access_secrets.h"

// Secret wifi data
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

// Secrect authentication data
String myMacAddress = SECRET_MAC;
String session = SECRET_KEY;

// Defining the server address and port number 
const char serverAddress[] = "tigoe.io";
const int port = 443;

// Wifi seettings
WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;

unsigned long timeCount = 0;
int setTemperature;
 float temperature;

void setup() {
  
  Serial.begin(9600);



  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  lcd.clear();

  connectToNetwork();

  if(WiFi.status() == WL_CONNECTED){
    Scheduler.startLoop(loop1);
  }

}

 void connectToNetwork() {

  while ( status != WL_CONNECTED) {
    
    Serial.print("Attempting to connect to Network named: ");
    // print the network name (SSID);
    Serial.println(ssid); 

    lcd.print("Connecting");

    // Connect to WPA/WPA2 network with the proper ssid & passcode.
    status = WiFi.begin(ssid, pass);

  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  
  }

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    connectToNetwork();
  } else {

      //Part 1: Getting data from attached sensors
      
      //A. tempreture data from the TMP 36 sensor
    
      int tempReading = analogRead(A1);     // Read analog value from A0 pin
      
      float voltage = tempReading *  (3.3/ 1024.0);    // convert the reading to millivolts:
    
      float temperature = (voltage - 0.5)/0.01;   // convert the millivolts to temperature celsius:
      
      // print temperature value for debugging, can be commented out
      //  Serial.print("Tempreature value from sensor is: ");
      //  Serial.println(temperature);
    
      // Sensor data from 10K potentiometer 
    
      int potReading = analogRead(A0);   // Read analog value from A1 pin
    
      int setTemperature = map(potReading, 1024, 0, 16, 35);    // mapping data values from pot to distinct tempreature values
    
      // Ending Sensor data readings
    
      // Part 2: Displaying data from sensors to the LCD display
//      lcd.clear();
//      lcd.setCursor(0,0);
//      lcd.print("SET TEMPERATURE"); // Prints text: to LCD
//      lcd.setCursor(0,1); // Sets the cursor to col 1 and row 0
//      lcd.print(setTemperature); // Prints value on Potpin1 to LCD
    
      // Part 3: Sending data to server
     
      timeCount = millis();
      
//      if(timeCount%5000 == 0){
    
          //Assembling POST request components
        
          String path = "/data";
          String contentType = "application/json";
           
          // Assembling unique creadentials to access server to post data
          String mac = "\"macAddress\":\""+myMacAddress+"\"";
          String sessionKey = "\"sessionKey\":\""+session+"\"";
        
          // Assembling the data from tempreature sensor & from 
    
          String dataJson = "{\'temperature\':" ;
          dataJson += temperature ;
          dataJson += ", ";
          dataJson +=  "\'targetTemp\':";
          dataJson += setTemperature;
          dataJson += "}";
          
          String data = "\"data\":\"" +dataJson+"\"";
        
          //Concatning all POST request data as a string object
          String postData = "{"+mac+","+sessionKey+","+data+"}";
        
          // POST request with the assembled data
          client.post(path,contentType,postData);
          
          // Logging data for debugging in Serial Monitor 
          Serial.println(postData);
        
          /*
           * On sending POST request making sure the data is being successfull sent 
           * read the status code and body of the response
          */
          int statusCode = client.responseStatusCode();
          String response = client.responseBody();
        
        
          // Print out status code to see where the data posting went wrong
          Serial.print("Status code: ");
          Serial.println(statusCode);
          Serial.print("Response: ");
          Serial.println(response);
    
//      }
    
      delay(1800000);

  }
  
}
void loop1(){

      int potReadingalias = analogRead(A0);   // Read analog value from A1 pin
    
      int setTemperaturealias = map(potReadingalias, 1024, 0, 16, 35);    // mapping data values from pot to distinct tempreature values
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("SET TEMPERATURE"); // Prints text: to LCD
      lcd.setCursor(0,1); // Sets the cursor to col 1 and row 0
      lcd.print(setTemperaturealias); // Prints value on Potpin1 to LCD

      delay(1000);
  }
