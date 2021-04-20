using ServicioRobotMSA.Procesos;
using ServicioRobotMSA.ProcesosMasivos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaServicioRoborMSA
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                List<System.Threading.Thread> hilos = new List<System.Threading.Thread>();

                ProcesosMasivosAplicacion procesoMasivo = new ProcesosMasivosAplicacion();
                Proceso proceso = new Proceso("ServicioRobotMSA.Procesos.PosicionamientoLogUsaquen");

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
