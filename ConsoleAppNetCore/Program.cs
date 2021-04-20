using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;

namespace ConsoleAppNetCore
{
    class Program
    {
        static String connectionString = "Endpoint=sb://servicebusdesarrollomsa.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=KlYccZLZP2jYVFU84eJcIniDq4s6R41Tpi7rC63TfJc=";
        static String topicName = "recepcionvolvomsadesarrollo";
        static String subscriptionName = "suscripcionVolvoMsaDesarrollo";


        static async Task Main()
        {

            var client = new MongoClient("mongodb://mongodb:mongodb@172.20.61.140:27017/?authSource=Volvo");
            var database = client.GetDatabase("Volvo");
            IMongoCollection<BsonDocument> collection = null;
            collection = database.GetCollection<BsonDocument>("Volvo");
            var firstDocument = collection.Find(new BsonDocument()).FirstOrDefault();


            var jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
            JObject json = JObject.Parse(firstDocument.ToJson<BsonDocument>(jsonWriterSettings));

            String jsonString = json.ToString();
            byte[] byteArray = Encoding.UTF8.GetBytes(jsonString);
            BinaryData data = new BinaryData(byteArray);

            // send a message to the topic
            await SendMessageToTopicAsync(data);

            // send a batch of messages to the topic
            await SendMessageBatchToTopicAsync();
        }
        static async Task SendMessageToTopicAsync(BinaryData data)
        {
            // create a Service Bus client 
            await using (ServiceBusClient client = new ServiceBusClient(connectionString))
            {
                // create a sender for the topic
                ServiceBusSender sender = client.CreateSender(topicName);

                await sender.SendMessageAsync(new ServiceBusMessage(data));
                await sender.SendMessageAsync(new ServiceBusMessage( "Hello, World!"));
                Console.WriteLine($"Sent a single message to the topic: {topicName}");
            }
        }

        static Queue<ServiceBusMessage> CreateMessages()
        {
            // create a queue containing the messages and return it to the caller
            Queue<ServiceBusMessage> messages = new Queue<ServiceBusMessage>();
            messages.Enqueue(new ServiceBusMessage("First message"));
            messages.Enqueue(new ServiceBusMessage("Second message"));
            messages.Enqueue(new ServiceBusMessage("Third message"));
            return messages;
        }

        static async Task SendMessageBatchToTopicAsync()
        {
            // create a Service Bus client 
            await using (ServiceBusClient client = new ServiceBusClient(connectionString))
            {

                // create a sender for the topic 
                ServiceBusSender sender = client.CreateSender(topicName);

                // get the messages to be sent to the Service Bus topic
                Queue<ServiceBusMessage> messages = CreateMessages();

                // total number of messages to be sent to the Service Bus topic
                int messageCount = messages.Count;

                // while all messages are not sent to the Service Bus topic
                while (messages.Count > 0)
                {
                    // start a new batch 
                    using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();

                    // add the first message to the batch
                    if (messageBatch.TryAddMessage(messages.Peek()))
                    {
                        // dequeue the message from the .NET queue once the message is added to the batch
                        messages.Dequeue();
                    }
                    else
                    {
                        // if the first message can't fit, then it is too large for the batch
                        throw new Exception($"Message {messageCount - messages.Count} is too large and cannot be sent.");
                    }

                    // add as many messages as possible to the current batch
                    while (messages.Count > 0 && messageBatch.TryAddMessage(messages.Peek()))
                    {
                        // dequeue the message from the .NET queue as it has been added to the batch
                        messages.Dequeue();
                    }

                    // now, send the batch
                    await sender.SendMessagesAsync(messageBatch);

                    // if there are any remaining messages in the .NET queue, the while loop repeats 
                }

                Console.WriteLine($"Sent a batch of {messageCount} messages to the topic: {topicName}");
            }
        }
    }
}
