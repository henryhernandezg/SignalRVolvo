/*
/// ---------------------------------------------------------------------------
/// <copyright>           
///    Copyright (c) Mectronics Todos los Derechos Reservados   
///    La información aquí contenida es propietaria y confidencial.            
/// </copyright> 
///
///	
/// Autor		 	: Giovanni Hernandez
/// Fecha Creacion	: Domingo, 11 de Abril de 2021
/// Propósito	 	: Define la clase que representa las operaciones del gestor de procesos masivos.
/// Nombre Archivo	: ProcesosMasivosAplicacion.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using ServicioRobotMSA.Procesos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
#endregion

namespace ServicioRobotMSA.ProcesosMasivos
{
    /// <summary>
    /// Clase que representa las operaciones de los procesos masivos.
    /// </summary>
    /// <history>
    ///      <creation author="Giovanni Hernandez" fecha="Domingo, 11 de Abril de 2021">
    ///      </creation>
    ///      <change author="" fecha="">
    ///      </change>
    /// </history>
    public class ProcesosMasivosAplicacion
    {

        #region Miembros
        #endregion

        #region Constructores
        public ProcesosMasivosAplicacion()
        {

        }

        public void EjecutarProceso(object informacionProcesoObj)
        {
            try
            {
                Proceso proceso = informacionProcesoObj as Proceso;

                IProcesoMasivo procesoEjecucion = null;
                String error = "-";
                procesoEjecucion = (IProcesoMasivo)System.Activator.CreateInstance(Type.GetType(proceso.Tipo.ToString()));

                if (informacionProcesoObj != null)
                {
                    lock (procesoEjecucion)
                    {
                        try
                        {
                            procesoEjecucion.EjecutarProceso();
                        }
                        catch (Exception ex)
                        {
                            error = ex.Message;

                            if (ex.InnerException != null)
                            {
                                error += ex.InnerException.Message;
                            }
                        }
                    }
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
        #endregion
    }
}
