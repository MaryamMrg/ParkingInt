# Use Java 17
FROM openjdk:17-jdk-slim

# Copy the JAR file
COPY target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]