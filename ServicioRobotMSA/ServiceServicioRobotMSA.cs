/*
/// ---------------------------------------------------------------------------
/// <copyright>           
///    Copyright (c) Mectronics Todos los Derechos Reservados   
///    La información aquí contenida es propietaria y confidencial.            
/// </copyright> 
///
///	
/// Autor		 : Giovanni Hernandez
/// Fecha Creacion	 : Martes, 02 de Febrero de 2021
/// Propósito	 : Representa la clase que inicia el servicio del cliente de captura de volvo
/// Nombre Archivo	 : ServiceServicioRobotMSA.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using ServicioRobotMSA.Procesos;
using ServicioRobotMSA.ProcesosMasivos;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
#endregion

namespace ServicioRobotMSA
{
    partial class ServiceServicioRobotMSA : ServiceBase
    {
        private List<System.Threading.Thread> hilos;
        public ServiceServicioRobotMSA()
        {
            hilos = new List<System.Threading.Thread>();
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            hilos = new List<System.Threading.Thread>();
            string laptime = System.Configuration.ConfigurationManager.AppSettings["LapTime"];
            int laptimenumber;

            this.tmrMain.Interval = 2000;
            if (Int32.TryParse(laptime, out laptimenumber))
            {
                this.tmrMain.Interval = laptimenumber;
            }

            this.tmrMain.Elapsed += new System.Timers.ElapsedEventHandler(tmrMain_Elapsed);
            this.tmrMain.Enabled = true;

            this.tmrMain.Start();
        }

        protected override void OnStop()
        {
            tmrMain.Stop();
        }

        void tmrMain_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                tmrMain.Enabled = false;
                tmrMain.Stop();

                System.Threading.Thread.Sleep(1000);

                hilos.RemoveAll(delegate (System.Threading.Thread item)
                {
                    return (!item.IsAlive);
                });

                ExecuteProcess();
            }
            catch (Exception exp)
            {
                this.EventLog.WriteEntry(exp.Message, EventLogEntryType.Error);
            }
            finally
            {
                tmrMain.Enabled = true;
                tmrMain.Start();
            }
        }

        private void ExecuteProcess()
        {
            try
            {
                

                ProcesosMasivosAplicacion procesoMasivo = new ProcesosMasivosAplicacion();
                Proceso proceso = null;

                if(hilos.Count(x => x.Name == "ServicioRobotMSA.Procesos.PosicionamientoLogUsaquen") == 0 && DateTime.Now.Hour > 0 && DateTime.Now.Hour < 8)
                {
                    proceso = new Proceso("ServicioRobotMSA.Procesos.PosicionamientoLogUsaquen");
                    System.Threading.Thread hilo = new System.Threading.Thread(procesoMasivo.EjecutarProceso);
                    hilo.Name = "ServicioRobotMSA.Procesos.PosicionamientoLogUsaquen";
                    hilo.Start(proceso);
                    hilos.Add(hilo);
                }

                if (hilos.Count(x => x.Name == "ServicioRobotMSA.Procesos.PosicionamientoLogSanCristobal") == 0 && DateTime.Now.Hour > 0 && DateTime.Now.Hour < 8)
                {
                    proceso = new Proceso("ServicioRobotMSA.Procesos.PosicionamientoLogSanCristobal");
                    System.Threading.Thread hilo = new System.Threading.Thread(procesoMasivo.EjecutarProceso);
                    hilo.Name = "ServicioRobotMSA.Procesos.PosicionamientoLogSanCristobal";
                    hilo.Start(proceso);
                    hilos.Add(hilo);
                }
            }
            catch (Exception ex)
            {
                // Get normal filepath of this assembly's permanent directory
                string dir = System.Configuration.ConfigurationManager.AppSettings["dirlog"];

                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                string clase = this.GetType().Name;
                string path = dir + clase + DateTime.Now.ToString("yyyyMMddHHmmss") + "Error.txt";
                if (!File.Exists(path))
                {
                    // Create a file to write to.
                    using (StreamWriter sw = File.CreateText(path))
                    {
                        sw.WriteLine("------------------------Message-------------------------------------");
                        sw.WriteLine(ex.Message);
                        sw.WriteLine("------------------------Message-------------------------------------");
                        if (ex.InnerException != null)
                        {
                            sw.WriteLine("------------------------InnerException-------------------------------------");
                            sw.WriteLine(ex.InnerException.Message);
                            sw.WriteLine("------------------------InnerException-------------------------------------");
                            sw.WriteLine("------------------------InnerException-StackTrace-------------------------------------");
                            sw.WriteLine(ex.InnerException.StackTrace);
                            sw.WriteLine("------------------------InnerException-StackTrace-------------------------------------");
                        }
                        sw.WriteLine("------------------------StackTrace-------------------------------------");
                        sw.WriteLine(ex.StackTrace);
                        sw.WriteLine("------------------------StackTrace-------------------------------------");
                    }
                }
            }
        }
    }
}
