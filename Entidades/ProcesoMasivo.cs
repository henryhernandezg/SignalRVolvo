using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class ProcesoMasivo
    {
        /// <summary>
        /// ProcesoMasivoNumeroHilo
        /// </summary>
        public Nullable<Int64> Id { get; set; }
        /// <summary>
        /// ProcesoMasivoNumeroHilo
        /// </summary>
        public Nullable<Int64> ProcesoMasivoNumeroHilo { get; set; }
        /// <summary>
        /// ProcesoMasivoFechaInicio
        /// </summary>
        public DateTime ProcesoMasivoFechaInicio { get; set; }
        /// <summary>
        /// ProcesoMasivoFechaFin
        /// </summary>
        public Nullable<DateTime> ProcesoMasivoFechaFin { get; set; }
        /// <summary>
        /// ProcesoMasivoFechaActualizacion
        /// </summary>
        public DateTime ProcesoMasivoFechaActualizacion { get; set; }
        /// <summary>
        /// ProcesoMasivoTipo
        /// </summary>
        public String ProcesoMasivoTipo { get; set; }
        /// <summary>
        /// ProcesoMasivoParametros
        /// </summary>
        public String ProcesoMasivoParametros { get; set; }
        /// <summary>
        /// ProcesoMasivoError
        /// </summary>
        public String ProcesoMasivoError { get; set; }
        /// <summary>
        /// ProcesoMasivoDefinitivo
        /// </summary>
        public Boolean ProcesoMasivoDefinitivo { get; set; }
        /// <summary>
        /// EstadoProcesoMasivoId
        /// </summary>
        public Int32 EstadoProcesoMasivoId { get; set; }
        /// <summary>
        /// TipoProcesoMasivoId
        /// </summary>
        public Int32 TipoProcesoMasivoId { get; set; }
        /// <summary>
        /// UsuarioId
        /// </summary>
        public Int32 UsuarioId { get; set; }
        /// <summary>
        /// ProcesoMasivoCiclico
        /// </summary>
        public Nullable<Boolean> ProcesoMasivoCiclico { get; set; }

    }
}
