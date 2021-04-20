(function (code) {
    code(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        try {

            //#region Variables
            //moment.locale('es');
            var Generico = new Globales();
            //#endregion

            //#region Columnas Grillas
            //#endregion

            //#region Controles
            //#endregion

            //#region Eventos
            //#endregion

            //#region funciones 
            function ConsultarProcesos() {
                Generico.EjecutarAjax('', {},
                    function (_okData) {
                        var d = new Date();
                        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
                        $("#FechaActualizacion").text(strDate);
                    },
                    function () { }, '/ProcesosMasivos/GetProcesoMasivosSP');
            }
            //#endregion

            //#region Iniciar Formulario
            setInterval(ConsultarProcesos, 240000);
            //#endregion

        } catch (err) {
            alert("Input is " + err);
        } finally {
            Globales = undefined;
        }
    });
}));