using ClientSignalVolvo.ProcesosMasivos;
using Microsoft.AspNet.SignalR.Client;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Linq;
using System.Collections.Generic;
using System.Threading;

namespace ClientSignalVolvo.Procesos
{
    public class HubVolvo : IProcesoMasivo
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
                DataVolvo dataVolvo = new DataVolvo();
                string objDataVolvo = "";

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
                try
                {
                    hubConnection.TraceLevel = TraceLevels.All;
                    hubConnection.Start().Wait();

                    stockTickerHubProxy.On("OnMsgs", msg =>
                    {
                        var listjson = JArray.Parse(msg.ToString());
                        foreach (var item in listjson)
                        {
                            JObject json = JObject.Parse(item.ToString());
                            List<DataVolvo> listDataVolvo = new List<DataVolvo>();
                            dataVolvo = new DataVolvo();

                            Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(item.ToString());
                            
                            dataVolvo.VehicleExternalId = myDeserializedClass.Message.Vehicle.ExternalId;

                            if (myDeserializedClass.Message.Event != null)
                            {
                                dataVolvo.VehicleTimestamp = myDeserializedClass.Message.Event.VehicleTimestamp;
                            }

                            if(myDeserializedClass.Message.Position != null)
                            {
                                dataVolvo.Heading = myDeserializedClass.Message.Position.Heading;
                                dataVolvo.Hdop = myDeserializedClass.Message.Position.Hdop;
                                dataVolvo.Vdop = myDeserializedClass.Message.Position.Vdop;
                                dataVolvo.Speed = myDeserializedClass.Message.Position.Speed;
                                dataVolvo.Latitude = myDeserializedClass.Message.Position.Latitude;
                                dataVolvo.Longitude = myDeserializedClass.Message.Position.Longitude;
                                dataVolvo.Altitude = myDeserializedClass.Message.Position.Altitude;
                            }

                            if(myDeserializedClass.Message.Metadata != null)
                            {
                                if (myDeserializedClass.Message.Metadata.Signals != null)
                                {
                                    dataVolvo.AnyDoorOpen = (myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "AnyDoorOpen").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "AnyDoorOpen").FirstOrDefault().Value.ToString());
                                    dataVolvo.Axle1Weight = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle1Weight").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle1Weight").FirstOrDefault().Value.ToString();
                                    dataVolvo.Axle2Weight = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle2Weight").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle2Weight").FirstOrDefault().Value.ToString();
                                    dataVolvo.BatteryVoltage = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "BatteryVoltage").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "BatteryVoltage").FirstOrDefault().Value.ToString();
                                    dataVolvo.CurrentGear = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "CurrentGear").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "CurrentGear").FirstOrDefault().Value.ToString();
                                    dataVolvo.EngineCoolantTemp = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineCoolantTemp").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineCoolantTemp").FirstOrDefault().Value.ToString();
                                    dataVolvo.EngineOilPressure = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilPressure").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilPressure").FirstOrDefault().Value.ToString();
                                    dataVolvo.EngineOilTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilTemperature").FirstOrDefault().Value.ToString();
                                    dataVolvo.FuelConsumption = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelConsumption").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelConsumption").FirstOrDefault().Value.ToString();
                                    dataVolvo.FuelLevel = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelLevel").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelLevel").FirstOrDefault().Value.ToString();
                                    dataVolvo.InsidePassengerTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "InsidePassengerTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "InsidePassengerTemperature").FirstOrDefault().Value.ToString();
                                    dataVolvo.Odometer = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Odometer").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Odometer").FirstOrDefault().Value.ToString();
                                    dataVolvo.OutsideTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "OutsideTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "OutsideTemperature").FirstOrDefault().Value.ToString();
                                    dataVolvo.TotalDistance = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalDistance").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalDistance").FirstOrDefault().Value.ToString();
                                    dataVolvo.TotalEngineHours = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalEngineHours").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalEngineHours").FirstOrDefault().Value.ToString();
                                    dataVolvo.TotalFuelUsed = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalFuelUsed").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalFuelUsed").FirstOrDefault().Value.ToString();
                                }
                            }
                           
                            listDataVolvo.Add(dataVolvo);
                            objDataVolvo = JsonConvert.SerializeObject(listDataVolvo);
                            pushDataset(objDataVolvo);

                            BsonDocument doc = BsonDocument.Parse(json.ToString());
                            collection.InsertOne(doc);
                            GC.Collect();
                        }
                    });

                    while (true)
                    {
                        stockTickerHubProxy.Invoke("Subscribe", request).Wait();
                    }

                    #region Anterior
                    //hubConnection.Start().ContinueWith(task =>
                    //{
                    //    if (task.IsFaulted)
                    //    {
                    //        Console.WriteLine("There was an error opening the connection:{0}", task.Exception.GetBaseException());
                    //    }
                    //    else
                    //    {
                    //        while (ciclo)
                    //        {

                    //            Thread.Sleep(5000);

                    //            try
                    //            {
                    //                stockTickerHubProxy.Invoke("Subscribe", request).ContinueWith(_task =>
                    //                {
                    //                    if (_task.IsFaulted)
                    //                    {
                    //                        Console.WriteLine("There was an error calling send: {0}", _task.Exception.GetBaseException());
                    //                    }
                    //                    else
                    //                    {
                    //                        if (_task.IsCompleted)
                    //                        {
                    //                            try
                    //                            {
                    //                                stockTickerHubProxy.On<object>("OnMsgs", msg =>
                    //                                {
                    //                                    var respuesta = msg.ToString();

                    //                                                        //if (guardarBaseDeDatos)
                    //                                                        //{
                    //                                                        var listjson = JArray.Parse(msg.ToString());
                    //                                                        //foreach (var item in listjson)
                    //                                                        //{
                    //                                                        JObject json = JObject.Parse(listjson[0].ToString());
                    //                                    List<DataVolvo> listDataVolvo = new List<DataVolvo>();

                    //                                    Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(listjson[0].ToString());

                    //                                    dataVolvo.VehicleExternalId = myDeserializedClass.Message.Vehicle.ExternalId;
                    //                                    dataVolvo.VehicleTimestamp = myDeserializedClass.Message.Event.VehicleTimestamp;
                    //                                    dataVolvo.Heading = myDeserializedClass.Message.Position.Heading;
                    //                                    dataVolvo.Hdop = myDeserializedClass.Message.Position.Hdop;
                    //                                    dataVolvo.Vdop = myDeserializedClass.Message.Position.Vdop;
                    //                                    dataVolvo.Speed = myDeserializedClass.Message.Position.Speed;
                    //                                    dataVolvo.Latitude = myDeserializedClass.Message.Position.Latitude;
                    //                                    dataVolvo.Longitude = myDeserializedClass.Message.Position.Longitude;
                    //                                    dataVolvo.Altitude = myDeserializedClass.Message.Position.Altitude;

                    //                                    dataVolvo.AnyDoorOpen = (myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "AnyDoorOpen").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "AnyDoorOpen").FirstOrDefault().Value.ToString());
                    //                                    dataVolvo.Axle1Weight = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle1Weight").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle1Weight").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.Axle2Weight = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle2Weight").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Axle2Weight").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.BatteryVoltage = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "BatteryVoltage").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "BatteryVoltage").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.CurrentGear = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "CurrentGear").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "CurrentGear").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.EngineCoolantTemp = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineCoolantTemp").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineCoolantTemp").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.EngineOilPressure = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilPressure").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilPressure").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.EngineOilTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "EngineOilTemperature").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.FuelConsumption = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelConsumption").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelConsumption").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.FuelLevel = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelLevel").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "FuelLevel").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.InsidePassengerTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "InsidePassengerTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "InsidePassengerTemperature").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.Odometer = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Odometer").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "Odometer").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.OutsideTemperature = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "OutsideTemperature").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "OutsideTemperature").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.TotalDistance = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalDistance").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalDistance").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.TotalEngineHours = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalEngineHours").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalEngineHours").FirstOrDefault().Value.ToString();
                    //                                    dataVolvo.TotalFuelUsed = myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalFuelUsed").Count() == 0 ? "" : myDeserializedClass.Message.Metadata.Signals.Where(x => x.Name.Trim() == "TotalFuelUsed").FirstOrDefault().Value.ToString();

                    //                                    listDataVolvo.Add(dataVolvo);
                    //                                    objDataVolvo = JsonConvert.SerializeObject(listDataVolvo);
                    //                                    pushDataset(objDataVolvo);

                    //                                    BsonDocument doc = BsonDocument.Parse(json.ToString());

                    //                                    Console.WriteLine(dataVolvo.VehicleExternalId);

                    //                                                        //Boolean tipoInsert;
                    //                                                        //Boolean.TryParse(ConfigurationManager.AppSettings["InsertOneAsync"].ToString(), out tipoInsert);
                    //                                                        //if (tipoInsert)
                    //                                                        //{
                    //                                                        //    collection.InsertOneAsync(doc);
                    //                                                        //}
                    //                                                        //else
                    //                                                        //{

                    //                                                        collection.InsertOne(doc);
                    //                                                        //}
                    //                                                        GC.Collect();
                    //                                                        //}
                    //                                                        //}
                    //                                                    });
                    //                            }
                    //                            catch (Exception ec)
                    //                            {

                    //                            }
                    //                        }
                    //                    }
                    //                    _task.Dispose();
                    //                });
                    //                task.Dispose();
                    //                GC.Collect();
                    //            }
                    //            catch (Exception errorInvoke)
                    //            {
                    //                Console.WriteLine("Error invoking: {0}", errorInvoke.Message);
                    //                                    //Envio correo
                    //                                    break;
                    //            }
                    //        }
                    //    }
                    //}).Wait();
                    #endregion

                }
                catch (Exception ex)
                {
                    hubConnection.Stop();
                    GC.Collect();
                    EjecutarProceso();
                }
                #endregion
            }
            catch (Exception ex)
            {
                hubConnection.Stop();
                GC.Collect();
                EjecutarProceso();
                //Envio correo
            }
        }

        public static void pushDataset(string parmJson)
        {
            //TODO: Add using System.Net and using System.IO

            string powerBIDatasetsApiUrl = "";
            powerBIDatasetsApiUrl = "https://api.powerbi.com/beta/f23a7c84-3d12-4082-a572-13781571a4e7/datasets/eb55d61b-1172-4b3c-91c3-7f20d9599865/rows?noSignUpCheck=1&key=L3S40EkbTUVrh7suvmgL36ORWOpUPlmHzjzlMCgw3vrIdVWnUuBddJiWoFjSKd9DB%2BGhIZL3cPSpiAVEcxO3wg%3D%3D";
            //POST web request to create a dataset.
            //To create a Dataset in a group, use the Groups uri: https://api.PowerBI.com/v1.0/myorg/groups/{group_id}/datasets
            System.Net.HttpWebRequest request = System.Net.WebRequest.Create(powerBIDatasetsApiUrl) as System.Net.HttpWebRequest;
            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentLength = 0;
            request.ContentType = "application/json";

            //Add token to the request header
            //request.Headers.Add("Authorization", String.Format("Bearer {0}", token));

            //Create dataset JSON for POST request
            string datasetJson = parmJson;
            //POST web request
            byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(datasetJson);
            request.ContentLength = byteArray.Length;

            //Write JSON byte[] into a Stream
            using (Stream writer = request.GetRequestStream())
            {
                writer.Write(byteArray, 0, byteArray.Length);

                var response = (System.Net.HttpWebResponse)request.GetResponse();

                Console.WriteLine(string.Format("Dataset {0}", response.StatusCode.ToString()));

            }
        }



    }
}
