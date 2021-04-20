using Entidades;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Linq;
using System.Web.Http;

namespace ProcesosMasivos.Controllers
{
    public class ProcesosMasivosController : ApiController
    {
        public List<IEnumerable<ProcesoMasivoVista>> GetProcesoMasivosSP()
        {
            Repositorio x = new Repositorio();
            IEnumerable<ProcesoMasivoVista> list = null;
            List<IEnumerable<ProcesoMasivoVista>> listFinal = new List<IEnumerable<ProcesoMasivoVista>>();
            String contextoText = ConfigurationManager.AppSettings.Get("contextos").ToString();
            String[] contexto = contextoText.Split(',').ToArray();

            String mensaje = "";
            String paratext = ConfigurationManager.AppSettings.Get("para").ToString();
            String[] para = paratext.Split(',').ToArray();

            foreach (String valor in contexto)
            {
                mensaje = "";
                list = x.EjecutarComandoVista<ProcesoMasivoVista>("EstadoActualizacionProcesoMasivo_Obtener", valor);

                if (list != null)
                {
                    if (list.Count() > 0)
                    {
                        foreach (ProcesoMasivoVista procesoMasivoVista in list)
                        {
                            mensaje += "El proceso : <b>" + procesoMasivoVista.ProcesoMasivoTipo.ToString() + "</b></br> se encuentra con más de 5 minutos : " + procesoMasivoVista.MinutosSinActualizar.ToString() + "</br> sin sincronizar, ultima hora de actualización : " + procesoMasivoVista.ProcesoMasivoFechaActualizacion.ToString() + " </br> y se encuentra en estado : " + procesoMasivoVista.EstadoProcesoMasivoNombre + "</br> </br></br> ";
                        }
                        x.EnvioCorreo365("Gestor Local " + valor, mensaje, para);
                    }
                    listFinal.Add(list);
                }
            }
            return listFinal;
        }

        public List<IEnumerable<ProcesoMasivo>> GetProcesoMasivos()
        {
            Repositorio x = new Repositorio();
            List<IEnumerable<ProcesoMasivo>> listFinal = new List<IEnumerable<ProcesoMasivo>>();
            IEnumerable<ProcesoMasivo> list = null;
            var entityBuilder = new EntityConnectionStringBuilder();
            String[] contexto = { "ContextoConejera", "ContextoSuba" };

            foreach (String valor in contexto)
            {
                String strConnString = ConfigurationManager.ConnectionStrings[valor].ConnectionString;
                ContextoPrincipal unidadTrabajoActual = new ContextoPrincipal(strConnString);
                list = unidadTrabajoActual.ProcesoMasivo;
                listFinal.Add(list);
            }
            return listFinal;
        }

    }
}
