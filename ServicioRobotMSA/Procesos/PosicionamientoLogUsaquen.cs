using ServicioRobotMSA.ProcesosMasivos;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using System.Diagnostics;
using System.IO;

namespace ServicioRobotMSA.Procesos
{
    public class PosicionamientoLogUsaquen : IProcesoMasivo
    {
        public void EjecutarProceso()
        {
            try
            {
                const string Comillas = "\"";
                int numeroDias = -1;
                string stringFechaCarpeta = System.DateTime.Now.AddDays(numeroDias).ToString("yyyyMMdd");

                String carpetaRobot = string.Empty;
                carpetaRobot = ConfigurationManager.AppSettings["directorioArchivosRobot"] + "TablaPosicionesLog\\Zonal\\Usaquen\\" + stringFechaCarpeta;

                #region ScriptZonal
                Boolean Zonal = true;
                int numeroIntentos = Int16.Parse(ConfigurationManager.AppSettings["numIntentos"]);
                do
                {
                    if (!Directory.Exists(carpetaRobot))
                    {
                        Directory.CreateDirectory(carpetaRobot);
                    }
                    // searches the current directory
                    int fCount = Directory.GetFiles(carpetaRobot, "*", SearchOption.TopDirectoryOnly).Length;
                    String comando = @" /testcontainer:" + Comillas + @"C:\RobotWeb\RobotWeb\RobotWeb\RobotPosicionamientoLogCEXPZonalUsaquen.loadtest" + Comillas + @" /resultsfile:C:\ArchivosRobot\Ejecuciones\ResultsRobotPosicionamientoLogCEXPZonalUsaquen" + stringFechaCarpeta + numeroIntentos.ToString() + @".trx /testsettings:" + Comillas + @"C:\RobotWeb\RobotWeb\Local.testsettings" + Comillas + " /usestderr";
                    if (fCount == 1545 || numeroIntentos == 0)
                    {
                        Zonal = false;
                    }
                    else
                    {
                        using (Process process = new Process())
                        {
                            process.StartInfo.FileName = @"C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\mstest.exe";
                            process.StartInfo.Arguments = comando;
                            process.StartInfo.UseShellExecute = false;
                            process.StartInfo.RedirectStandardOutput = true;
                            process.StartInfo.CreateNoWindow = true;
                            process.Start();

                            StreamReader reader = process.StandardOutput;
                            string output = reader.ReadToEnd();
                        }
                        numeroIntentos--;
                    }

                } while (Zonal);
                #endregion

                #region ScriptTroncal
                Boolean Troncal = true;
                numeroIntentos = Int16.Parse(ConfigurationManager.AppSettings["numIntentos"]);
                carpetaRobot = ConfigurationManager.AppSettings["directorioArchivosRobot"] + "TablaPosicionesLog\\Troncal\\Usaquen\\" + stringFechaCarpeta;
                do
                {
                    if (!Directory.Exists(carpetaRobot))
                    {
                        Directory.CreateDirectory(carpetaRobot);
                    }
                    // searches the current directory
                    int fCount = Directory.GetFiles(carpetaRobot, "*", SearchOption.TopDirectoryOnly).Length;
                    String comando = @" /testcontainer:" + Comillas + @"C:\RobotWeb\RobotWeb\RobotWeb\RobotPosicionamientoLogCEXPTroncalUsaquen.loadtest" + Comillas + @" /resultsfile:C:\ArchivosRobot\Ejecuciones\ResultsRobotPosicionamientoLogCEXPTroncalUsaquen" + stringFechaCarpeta + numeroIntentos.ToString() + @".trx /testsettings:" + Comillas + @"C:\RobotWeb\RobotWeb\Local.testsettings" + Comillas + " /usestderr";
                    if (fCount == 310 || numeroIntentos == 0)
                    {
                        Troncal = false;
                    }
                    else
                    {
                        using (Process process = new Process())
                        {
                            process.StartInfo.FileName = @"C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\mstest.exe";
                            process.StartInfo.Arguments = comando;
                            process.StartInfo.UseShellExecute = false;
                            process.StartInfo.RedirectStandardOutput = true;
                            process.StartInfo.CreateNoWindow = true;
                            process.Start();

                            StreamReader reader = process.StandardOutput;
                            string output = reader.ReadToEnd();
                        }
                        numeroIntentos--;
                    }

                } while (Troncal);
                #endregion
            }
            catch (Exception ex)
            {
                // Get normal filepath of this assembly's permanent directory
                string dir = ConfigurationManager.AppSettings["dirlog"];

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

                throw ex;
            }
        }
    }
}
