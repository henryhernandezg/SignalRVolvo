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
/// Propósito	 : Representa la definición de inicio del servicio de captura de los datos de Volvo.
/// Nombre Archivo	 : ServicioRobotMSA.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
#endregion

namespace ServicioRobotMSA
{
    /// <summary>
    /// Implementación del gestor de procesos masivos.
    /// </summary>
    /// </summary>
    /// <history>
    ///      <creation author="Giovanni Hernandez" fecha="Martes, 02 de Febrero de 2021">
    ///      </creation>
    ///      <change author="" fecha="">
    ///      </change>
    /// </history>
    static class Program
    {
        /// <summary>
        /// Punto de entrada principal para la aplicación.
        /// </summary>
        static void Main(string[] args)
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new ServiceServicioRobotMSA()
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}
