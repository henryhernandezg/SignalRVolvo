/*
/// ---------------------------------------------------------------------------
/// <copyright>           
///    Copyright (c) Mectronics Todos los Derechos Reservados   
///    La información aquí contenida es propietaria y confidencial.            
/// </copyright> 
///
///	
/// Autor		 : Giovanni Hernandez
/// Fecha Creacion	 : Domingo, 11 de Abril de 2021
/// Propósito	 : Define la interface para el gestor de procesos masivos.
/// Nombre Archivo	 : IProcesoMasivo.cs
///
/// -----------------------------------------------------------------------------
*/

#region Directivas
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#endregion

namespace ServicioRobotMSA.ProcesosMasivos
{
    public interface IProcesoMasivo
    {
        void EjecutarProceso();
    }
}
