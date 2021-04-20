/*
/// ---------------------------------------------------------------------------
/// <copyright>           
///    Copyright (c) Mectronics Todos los Derechos Reservados   
///    La información aquí contenida es propietaria y confidencial.            
/// </copyright> 
///
///	
/// Autor		 	: Giovanni Hernandez
/// Fecha Creacion	: viernes, 09 de Diciembre de 2016
/// Propósito	 	: Define la clase que representa las operaciones del gestor de procesos masivos.
/// Nombre Archivo	: ProcesosMasivosAplicacion.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using ClientSignalVolvo.Procesos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
#endregion

namespace ClientSignalVolvo.ProcesosMasivos
{
    /// <summary>
    /// Clase que representa las operaciones de los procesos masivos.
    /// </summary>
    /// <history>
    ///      <creation author="Giovanni Hernandez" fecha="viernes, 09 de Diciembre de 2016">
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
                throw ex;
            }
        }
        #endregion
    }
}
