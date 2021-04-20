namespace ServicioRobotMSA
{
    partial class ServiceServicioRobotMSA
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;
        private System.Timers.Timer tmrMain;

        /// <summary> 
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de componentes

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.tmrMain = new System.Timers.Timer();
            components = new System.ComponentModel.Container();
            ((System.ComponentModel.ISupportInitialize)(this.tmrMain)).BeginInit();
            // 
            // tmrMain
            // 
            this.tmrMain.Enabled = true;
            // 
            // ServiceGestor
            // 
            this.ServiceName = "ServicioServicioRobotMSA";
            ((System.ComponentModel.ISupportInitialize)(this.tmrMain)).EndInit();

        }

        #endregion

        
    }
}