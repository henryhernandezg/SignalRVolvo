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
/// Nombre Archivo	 : ServiceClientSignalVolvo.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using ClientSignalVolvo.Procesos;
using ClientSignalVolvo.ProcesosMasivos;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
#endregion

namespace ClientSignalVolvo
{
    partial class ServiceClientSignalVolvo : ServiceBase
    {
        private List<System.Threading.Thread> hilos;
        public ServiceClientSignalVolvo()
        {
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
                hilos = new List<System.Threading.Thread>();

                ProcesosMasivosAplicacion procesoMasivo = new ProcesosMasivosAplicacion();
                Proceso proceso = new Proceso("ClientSignalVolvo.Procesos.HubVolvo");

                System.Threading.Thread hilo = new System.Threading.Thread(procesoMasivo.EjecutarProceso);
                hilo.Start(proceso);
                hilos.Add(hilo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
