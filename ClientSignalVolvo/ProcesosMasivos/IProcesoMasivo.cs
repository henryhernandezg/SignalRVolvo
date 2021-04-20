/*
/// ---------------------------------------------------------------------------
/// <copyright>           
///    Copyright (c) Mectronics Todos los Derechos Reservados   
///    La información aquí contenida es propietaria y confidencial.            
/// </copyright> 
///
///	
/// Autor		 : Giovanni Hernandez
/// Fecha Creacion	 : Viernes, 09 de Diciembre de 2016
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

namespace ClientSignalVolvo.ProcesosMasivos
{
    public interface IProcesoMasivo
    {
        void EjecutarProceso();
    }
}
