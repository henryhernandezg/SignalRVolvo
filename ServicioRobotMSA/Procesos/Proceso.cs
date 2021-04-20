using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioRobotMSA.Procesos
{
    public class Proceso
    {
        public string Tipo { get; set; }

        public Proceso(String tipo)
        {
            Tipo = tipo;
        }
    }
}
