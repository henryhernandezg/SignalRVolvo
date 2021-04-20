using Microsoft.Exchange.WebServices.Autodiscover;
using Microsoft.Exchange.WebServices.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class Repositorio
    {
        public IEnumerable<TVista> EjecutarComandoVista<TVista>(String StoreProcedure, String Contexto)
        {

            IEnumerable<TVista> entidades;
            string definicionObtener = string.Empty;
            SqlParameter filtro = null;
            string detalleError = string.Empty;

            var entityBuilder = new EntityConnectionStringBuilder();
            String strConnString = ConfigurationManager.ConnectionStrings[Contexto].ConnectionString;
            ContextoPrincipal unidadTrabajoActual = new ContextoPrincipal(strConnString);

            try
            {
                entidades = unidadTrabajoActual.Database.SqlQuery<TVista>(String.Format("EXEC [{0}].[{1}]", "ProcesosMasivos", StoreProcedure)).ToList();
            }
            catch (Exception exception)
            {
                detalleError = exception.Message;
                String paratext = ConfigurationManager.AppSettings.Get("para").ToString();
                String[] para = paratext.Split(',').ToArray();
                EnvioCorreo365("Error conexión BD - " + Contexto, exception.Message, para);

                //throw exception;
                entidades = null;
            }
            finally
            {
                definicionObtener = null;
                filtro = null;
                unidadTrabajoActual = null;
            }

            return entidades;

        }

        public void EnvioCorreo365(String asunto, String mesaje, String[] para)
        {
            ExchangeService myservice = new ExchangeService(ExchangeVersion.Exchange2010_SP1)
            {
                Credentials = new WebCredentials(ConfigurationManager.AppSettings.Get("SenderEmailid").ToString(), ConfigurationManager.AppSettings.Get("Password").ToString())
            };

            try
            {
                string serviceUrl = ConfigurationManager.AppSettings.Get("Office365WebserivceURL").ToString();
                myservice.Url = new Uri(serviceUrl);
                EmailMessage emailMessage = new EmailMessage(myservice)
                {
                    Subject = asunto,
                    Body = new MessageBody(mesaje)
                };
                foreach (String valor in para)
                {
                    emailMessage.ToRecipients.Add(valor);
                }
                emailMessage.Send();
            }
            catch (SmtpException exception)
            {
                string msg = "Mail cannot be sent (SmtpException):";
                msg += exception.Message;
                throw new Exception(msg);
            }

            catch (AutodiscoverRemoteException exception)
            {
                string msg = "Mail cannot be sent(AutodiscoverRemoteException):";
                msg += exception.Message;
                throw new Exception(msg);
            }
        }
    }
}
