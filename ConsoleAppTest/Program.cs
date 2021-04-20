using ClientSignalVolvo.Procesos;
using ClientSignalVolvo.ProcesosMasivos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppTest
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                List<System.Threading.Thread> hilos = new List<System.Threading.Thread>();

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
