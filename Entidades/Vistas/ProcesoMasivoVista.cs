using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class ProcesoMasivoVista
    {

        //public Nullable<long> ProcesoMasivoId { get; set; }
        public Nullable<int> MinutosSinActualizar { get; set; }
        public Nullable<DateTime> ProcesoMasivoFechaActualizacion { get; set; }
        public string ProcesoMasivoTipo { get; set; }
        public string EstadoProcesoMasivoNombre { get; set; }

    }
}
