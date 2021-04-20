using ClientSignalVolvo.ProcesosMasivos;
using Microsoft.AspNet.SignalR.Client;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using Azure.Messaging.ServiceBus;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using MongoDB.Bson.IO;

namespace ClientSignalVolvo.Procesos
{
    public class HubVolvoAsync : IProcesoMasivo
    {
        public void EjecutarProceso()
        {
            String conexionMongoDb = ConfigurationManager.AppSettings["conexionMongoDb"];
            //https://fm.servicesvolvobuses.com/Tmix.Cap.ExternalApi/signalr
            String conexionhubConnection = ConfigurationManager.AppSettings["hubConnection"];
            Int32 numeroDocumentos = Int32.Parse(ConfigurationManager.AppSettings["numeroDocumentos"]);
            var hubConnection = new HubConnection(conexionhubConnection);
            MongoClient clientMongoDb = null;
            IMongoDatabase database = null;
            IMongoCollection<BsonDocument> collection = null;
            Boolean guardarBaseDeDatos = Boolean.TryParse(ConfigurationManager.AppSettings["guardarBaseDeDatos"].ToString(), out guardarBaseDeDatos); ;
            Boolean ciclo = true;
            try
            {
                #region ClienteMongoDb
                clientMongoDb = new MongoClient(conexionMongoDb);
                database = clientMongoDb.GetDatabase("Volvo");
                collection = database.GetCollection<BsonDocument>("Volvo");
                var firstDocument = collection.Find(new BsonDocument()).FirstOrDefault();
                #endregion

                #region ServiceBus
                /*
                string keyNameServiceBus = ConfigurationManager.AppSettings["keyNameServiceBus"];
                string accessKeyServiceBus = ConfigurationManager.AppSettings["accessKeyServiceBus"];
                string baseAddressServiceBus = ConfigurationManager.AppSettings["baseAddressServiceBus"];
                String topicNameServiceBus = ConfigurationManager.AppSettings["topicNameServiceBus"];

                // Create Sender
                TokenProvider tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(keyNameServiceBus, accessKeyServiceBus);
                MessagingFactory messagingFactory = MessagingFactory.Create(baseAddressServiceBus, tokenProvider);
                MessageSender sender = messagingFactory.CreateMessageSender(topicNameServiceBus);

                // Prepare message
                var jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
                JObject jsonSend = JObject.Parse(firstDocument.ToJson<BsonDocument>(jsonWriterSettings));
                String jsonString = jsonSend.ToString();
                byte[] byteArray = Encoding.UTF8.GetBytes(jsonString);
                //var sendJson = JsonConvert.SerializeObject(jsonSend);

                // Send


                sender.Send(new BrokeredMessage(byteArray));

                sender.Send(new BrokeredMessage(jsonString));

                */
                #endregion

                #region ConexionVolvo
                
                object request = new
                {
                    version = "1.0",
                    vehicleEvents = new
                    {
                        Subscribe = true
                    }
                };

                string username = ConfigurationManager.AppSettings["usernamehubConnection"];
                string password = ConfigurationManager.AppSettings["passwordhubConnection"];
                hubConnection.Credentials = new NetworkCredential(username, password);
                IHubProxy stockTickerHubProxy = hubConnection.CreateHubProxy("realtimehub");
                while (ciclo)
                {
                    try
                    {
                        hubConnection.TraceLevel = TraceLevels.All;
                        hubConnection.TraceWriter = Console.Out;
                        hubConnection.ConnectionSlow += () => Console.WriteLine("Connection problems....");
                        hubConnection.Error += ex => Console.WriteLine("SignalR error: {0}", ex.Message);

                        hubConnection.Start().ContinueWith(task =>
                        {
                            if (task.IsFaulted)
                            {
                                Console.WriteLine("There was an error opening the connection:{0}", task.Exception.GetBaseException());
                                ciclo = false;
                            }                            
                            else
                            {
                                //while (ciclo)
                                //{
                                    try
                                    {
                                        var result = stockTickerHubProxy.Invoke("Subscribe", request).ContinueWith(_task =>
                                        {
                                            if (_task.IsFaulted)
                                            {
                                                Console.WriteLine("There was an error calling send: {0}", _task.Exception.GetBaseException());
                                                ciclo = false;
                                            }
                                            else
                                            {
                                                if (_task.IsCompleted)
                                                {
                                                    try
                                                    {
                                                        stockTickerHubProxy.On<object>("OnMsgs", msg =>
                                                        {
                                                            var respuesta = msg.ToString();

                                                            if (guardarBaseDeDatos)
                                                            {
                                                                var listjson = JArray.Parse(msg.ToString());
                                                                foreach (var item in listjson)
                                                                {
                                                                    JObject json = JObject.Parse(item.ToString());
                                                                    BsonDocument doc = BsonDocument.Parse(json.ToString());
                                                                    Boolean tipoInsert;
                                                                    Boolean.TryParse(ConfigurationManager.AppSettings["InsertOneAsync"].ToString(), out tipoInsert);
                                                                    if (tipoInsert)
                                                                    {
                                                                        collection.InsertOneAsync(doc);
                                                                    }
                                                                    else
                                                                    {
                                                                        collection.InsertOne(doc);
                                                                    }
                                                                    GC.Collect();
                                                                }
                                                            }

                                                            //numeroDocumentos--;
                                                        });
                                                    }
                                                    catch (Exception ec)
                                                    {

                                                    }
                                                }
                                            }
                                            _task.Dispose();
                                        });

                                        //if (numeroDocumentos <= 0)
                                        //{
                                        //    ciclo = false;
                                        //    break;
                                        //}
                                        task.Dispose();
                                        GC.Collect();
                                    }
                                    catch(Exception errorInvoke)
                                    {
                                        Console.WriteLine("Error invoking: {0}", errorInvoke.Message);
                                    }
                                //}
                            }
                        }).Wait();

                        //hubConnection.Stop();
                    }
                    catch (Exception)
                    {
                        hubConnection.Stop();
                        GC.Collect();
                    }
                }

                #endregion
            }
            catch (Exception ex)
            {
                hubConnection.Stop();
                GC.Collect();
                throw ex;
            }
        }
    }
}
