Globales = function Globales() {

    var thisJs = this,
        coleccionServicioRelacionado = [],//Esta variable es usada para retornar las colecciones de una entidad cuando se está creando un servicio padre.;
        objInformacionServicioCrud = {}; // Se usa para tomar los valores de la tabla y servicios campo de la vista que se crea en la funcion PintaControles, una vez sea usada y se haya trabajado con ella se debe limpiar su información 

    //kendo.culture("es-CO");


    /// <summary>
    /// <Descripción>Retorna las propiedades de un objeto seleccionado en una grilla o combo de Kendo, excluyendo las funciones </Descripción>
    /// <parametros>
    /// <nombre>dataItem</nombre> <Detalle>Registro seleccionado de la base de datos</Detalle>
    /// </parametros>
    /// </summary>
    function ObjetoKendo(dataItem) {
        var objSeleccion = {};
        for (var propertyName in dataItem) {
            if (propertyName !== 'dirty' && propertyName !== 'uid' && propertyName !== 'defaults' && propertyName !== 'fields' && propertyName.indexOf('_') < 0 && !($.isFunction(dataItem[propertyName]))) {
                objSeleccion[propertyName] = dataItem[propertyName];
            }
        }
        return objSeleccion;
    }

    /// <summary>
    /// <Descripción>Objeto que contiene como propiedades los mismos enumeradores del código en ServiciosEnum</Descripción>
    /// <parametros>
    /// <nombre></nombre> <Detalle></Detalle>
    /// </parametros>
    /// </summary>
    this.ServicioEnum = {
        SinDefinir: 0,

        //#region dbo
        dbo_GenAutobuses: 156,
        //#endregion

        //region Administracion
        Administracion_AutoBus: 18,
        Administracion_Bodega: 21,
        Administracion_TipoBodega: 23,
        Administracion_Pais: 25,
        Administracion_CausaDesecho: 27,
        Administracion_CausaGarantia: 29,
        Administracion_TipoFlota: 31,
        Administracion_TipoVehiculo: 33,
        Administracion_AreaFuncional: 96,
        Administracion_Barrio: 97,
        Administracion_CargoLaboral: 98,
        Administracion_Empresa: 99,
        Administracion_EmpresaTipo: 100,
        Administracion_Escolaridad: 101,
        Administracion_EstadoCivil: 102,
        Administracion_EstadoLaboral: 103,
        Administracion_EstadoNovedad: 104,
        Administracion_Examenes: 105,
        Administracion_ExamenesTipo: 106,
        Administracion_MotivoRetiro: 107,
        Administracion_Patio: 108,
        Administracion_RH: 109,
        Administracion_Salario: 110,
        Administracion_TipoContrato: 111,
        Administracion_TipoNovedad: 112,
        Administracion_TipoVivienda: 113,
        Administracion_Zona: 114,
        Administracion_DesencadenadorNotificacion: 123,
        Administracion_ListaVerificacionElementos: 124,
        Administracion_ListaVerificacionTipo: 125,
        Administracion_NotificacionTipo: 126,
        Administracion_Periodicidad: 127,
        Administracion_Objeto: 155,
        Administracion_Area: 160,
        //endregion

        //region Almacen
        Almacen_MaterialActividadMantenimiento: 5,
        Almacen_Material: 35,
        Almacen_MaterialUbicacion: 36,
        Almacen_Solicitud: 38,
        Almacen_Ubicacion: 39,
        Almacen_Concepto: 83,
        Almacen_TipoMovimiento: 84,
        //endregion

        //region Auditoria
        Auditoria_EstadoEntidad: 22,
        Auditoria_Entidad: 24,
        Auditoria_DetalleEntidad: 26,
        //endregion

        //region Compras
        Compras_OrdenCompra: 40,
        Compras_Proveedor: 41,
        Compras_EstadoOrdenCompra: 80,
        Compras_OrdenCompraDetalle: 81,
        //endregion

        //region Configuracion
        Configuracion_UnidadNegocio: 20,
        Configuracion_Servicio: 42,
        Configuracion_ServicioCampo: 43,
        Configuracion_ServicioTipoCampo: 44,
        Configuracion_TipoServicio: 45,
        Configuracion_UnidadNegocioBodegaLlanta: 74,
        Configuracion_ServicioReporte: 78,
        Configuracion_ServicioCampoReporte: 79,
        Configuracion_ParametrosAplicacion: 128,
        Configuracion_TipoAnexo: 129,
        //endregion

        //region Interoperabilidad
        Interoperabilidad_NaviProgramacion: 1096,
        //endregion

        //region Juridico
        Juridico_EstadosProceso: 1102,
        Juridico_EvidenciaInformacionProcesoReporte: 1103,
        Juridico_InformacionProcesoReporte: 1104,
        Juridico_ItemDetalletipoNovedadReporte: 1105,
        Juridico_ItemsDetalleTipoNovedad: 1106,
        Juridico_Reporte: 1107,
        Juridico_ReportePersona: 1108,
        Juridico_TipoDetalleNovedad: 1109,
        Juridico_TipoEstadoProceso: 1110,
        Juridico_TipoNovedadReporte: 1111,
        Juridico_TipoRolReporte: 1112,
        //endregion

        //region Llantas
        Llantas_BusKmPromedio: 8,
        Llantas_ProfundidadPromedio: 10,
        Llantas_KilometrajeBus: 12,
        Llantas_KilometrajeLlanta: 15,
        Llantas_KilometrajePendiente: 17,
        Llantas_ActividadMaterial: 19,
        Llantas_ActividadLlanta: 46,
        Llantas_ActividadLlantaMaterial: 47,
        Llantas_ActividadMantenimiento: 48,
        Llantas_Ciclo: 49,
        Llantas_DetalleSolicitudLlanta: 50,
        Llantas_Dimension: 51,
        Llantas_Diseno: 52,
        Llantas_Eje: 53,
        Llantas_Estado: 54,
        Llantas_EstadoAccion: 55,
        Llantas_InspeccionLlantaBus: 56,
        Llantas_InspeccionActividadLlanta: 57,
        Llantas_Llanta: 58,
        Llantas_LlantaBus: 59,
        Llantas_LlantaRegistroEntrada: 60,
        Llantas_LlantaRegistroSalida: 61,
        Llantas_Marca: 62,
        Llantas_NotaGarantia: 63,
        Llantas_Posicion: 64,
        Llantas_Profundidad: 65,
        Llantas_Referencia: 66,
        Llantas_RegistroSalida: 67,
        Llantas_Reparacion: 68,
        Llantas_TipoFlotaPosicion: 69,
        Llantas_TrasladoLlanta: 70,
        Llantas_ActividadBusMaterial: 82,
        Llantas_TrasladoLlantaEstado: 85,
        Llantas_RelacionEstado: 89,
        Llantas_AnalisisFueraServicioAtribuible: 90,
        Llantas_AnalisisFueraServicioCausa: 91,
        Llantas_AnalisisFueraServicioLugarFalla: 92,
        Llantas_AnalisisFueraServicioRetiroLlanta: 93,
        Llantas_ActividadProveedor: 130,
        Llantas_ReferenciaProveedor: 131,
        //endregion

        //region Mantenimiento
        Mantenimiento_Chasis: 71,
        Mantenimiento_OrdenTrabajo: 72,
        Mantenimiento_HistoricoBus: 159,
        Mantenimiento_GrupoBusesInoperativos: 157,
        //endregion

        //region Notificacion
        Notificacion_Notificacion: 132,
        Notificacion_NotificacionUsuario: 133,
        Notificacion_NotificacionSignal: 148,
        Notificacion_Noticia: 150,
        Notificacion_NotificacionMensaje: 151,
        Notificacion_NotificacionPersonal: 152,
        Notificacion_TipoNotificacion: 1099,
        //endregion

        //region Operaciones
        Operaciones_Cargues: 1097,
        Operaciones_TipoCargue: 1098,
        //endregion

        //region Personal
        Personal_AdjuntoNovedadPersona: 115,
        Personal_AdjuntoPersona: 116,
        Personal_CondicionReglaNovedad: 117,
        Personal_EmpresasPersona: 118,
        Personal_NovedadPersona: 119,
        Personal_Persona: 120,
        Personal_ReglaNovedad: 121,
        Personal_ListaVerificacionPersona: 134,
        Personal_VacanteDisponibles: 135,
        Personal_VacantesDisponiblesCandidatos: 136,
        Personal_Capacitaciones: 162,
        //endregion

        //region Planeacion
        Planeacion_ConsolidadoIndicadoresOperacion: 137,
        Planeacion_ConsolidadoIndicadoresOperacionDetalle: 138,
        Planeacion_Evento: 139,
        Planeacion_MatrizTiempoDistancia: 140,
        Planeacion_Parada: 141,
        Planeacion_TablaHorario: 142,
        Planeacion_TablaHorarioDetalle: 143,
        Planeacion_PlaneacionTipoServicio: 147,
        //endregion

        //region ProcesosMasivos
        ProcesosMasivos_TipoParametro: 9,
        ProcesosMasivos_ParametroProcesoMasivo: 11,
        ProcesosMasivos_TipoProcesoMasivo: 13,
        ProcesosMasivos_EstadoProcesoMasivo: 14,
        ProcesosMasivos_ProcesoMasivo: 16,
        ProcesosMasivos_ExpresionRegular: 28,
        ProcesosMasivos_TipoDato: 30,
        ProcesosMasivos_CargueArchivo: 32,
        ProcesosMasivos_DetalleCargueArchivo: 34,
        ProcesosMasivos_TipoProcesoCargueArchivo: 37,
        ProcesosMasivos_TipoResultado: 86,
        ProcesosMasivos_ResultadoProceso: 87,
        ProcesosMasivos_LogErrorProceso: 88,
        ProcesosMasivos_ArchivoTablaResumen: 1100,
        ProcesosMasivos_TablaResumen: 1101,
        //endregion

        //region Programacion
        Programacion_PRG: 144,
        Programacion_PRGDetalle: 145,
        //endregion

        //region Seguridad
        Seguridad_Rol: 1,
        Seguridad_RolOperacionAccion: 2,
        Seguridad_RolServicio: 3,
        Seguridad_Usuario: 4,
        Seguridad_UsuarioBodega: 6,
        Seguridad_UsuarioRol: 7,
        Seguridad_Accion: 73,
        Seguridad_Menu: 75,
        Seguridad_MenuRol: 76,
        Seguridad_Operacion: 77,
        Seguridad_UsuarioPatio: 149,
        Seguridad_MonitorTableroControl: 153,
        //endregion

        //region Sief1
        Sief1_Interoperabilidad: 94,
        //endregion

        //Sección de enumeradores virtuales(no se deben borrar)

        //region Graficas
        Graficas_Graficas: 255,
        //endregion

        //region NotificacionCorreo
        Correo_NotificacionCorreo: 254,
        //endregion

        //region Interoperabilidad
        Interoperabilidad_ProgramacionNavi: 1096,
        //endregion

        //region ConsultaExterna
        Consulta_ConsultaExterna: 1097,
        //endregion

        Operaciones_TipoCargueArchivo: 1098,
        Seguridad_MonitorTableroControl: 153,


        //#region EstadoLlanta
        EstadoLlanta_Nueva: 1,
        EstadoLlanta_Montada: 2,
        EstadoLlanta_Desmontada: 3,
        EstadoLlanta_Garantia: 4,
        EstadoLlanta_Reencauche: 5,
        EstadoLlanta_Reparacion: 6,
        EstadoLlanta_Desechada: 7,
        EstadoLlanta_FueradeServicio: 8,
        EstadoLlanta_PendienteInspeccion: 9,


        //#endregion

        //#region ActividadMantenimiento
        ActividadMantenimiento_NoAplica: 0,
        ActividadMantenimiento_Rotacion: 2,
        ActividadMantenimiento_Desmontaje: 3,
        ActividadMantenimiento_Montaje: 4,
        ActividadMantenimiento_Balanceo: 5,
        ActividadMantenimiento_Despinche: 6,
        ActividadMantenimiento_Alineacion: 7,
        ActividadMantenimiento_Inspeccion: 8,
        ActividadMantenimiento_Regrabado: 9,
        ActividadMantenimiento_Reencauche: 10,

        ActividadMantenimiento_SalidaGarantia: 11,
        ActividadMantenimiento_SalidaReencauche: 12,
        ActividadMantenimiento_SalidaReparacion: 13,

        ActividadMantenimiento_Traslado: 14,
        ActividadMantenimiento_EntradaGarantia: 15,
        ActividadMantenimiento_EntradaReencauche: 16,
        ActividadMantenimiento_EntradaReparacion: 17,
        ActividadMantenimiento_FueraServicio: 19,
        ActividadMantenimiento_RetiroLlanta: 20,
        ActividadMantenimiento_ActualizacionKilometraje: 21,
        ActividadMantenimiento_Reparacion: 22,
        ActividadMantenimiento_Torqueo: 23,
        ActividadMantenimiento_Calibracion: 24,


        //#endregion

        //#region Causa Garantia
        CausaGarantia_Reencauchada: 1,
        CausaGarantia_Reparada: 2,
        CausaGarantia_Pagonotacredito: 3,
        CausaGarantia_Rechazogarantia: 4,
        //#endregion

        //#region ServicioTipoCampo
        ServicioTipoCampo_Simple: 1,
        ServicioTipoCampo_Lista: 2,
        ServicioTipoCampo_MultiLista: 3,
        ServicioTipoCampo_Asignacion: 4,
        ServicioTipoCampo_Busqueda: 5,
        //#endregion

        //#region TipoServicio
        TipoServicio_Transaccional: 1,
        TipoServicio_Parametrica: 2,
        TipoServicio_Configuracion: 3,
        TipoServicio_Seguridad: 4,
        TipoServicio_Accion: 5,
        //#endregion

        //#region TrasladoLlantaEstado
        TrasladoLlantaEstado_Aceptado: 1,
        TrasladoLlantaEstado_Anulado: 2,
        TrasladoLlantaEstado_Rechazado: 3,
        TrasladoLlantaEstado_EnEspera: 4,
        //#endregion

        //#region TipoNovedad
        TipoNovedad_Ingreso: 1,
        TipoNovedad_Ascenso: 2,
        TipoNovedad_Retiro: 3,
        TipoNovedad_Traslado: 4,
        TipoNovedad_VencimientoLicencia: 5,
        //#endregion

        //#region EstadoNovedad
        EstadoNovedad_Creado: 1,
        EstadoNovedad_Aprobado: 2,
        EstadoNovedad_Rechazada: 3,
        EstadoNovedad_Anulada: 5,
        //#endregion

        //#region EstadoDetalle
        EstadoDetalle_Inactivo: 0,
        EstadoDetalle_Activo: 1,

        //#endregion

        //#region MantenimientoEstado
        MantenimientoEstado_Creacion: 2,
        MantenimientoEstado_Ejecutada: 3,
        MantenimientoEstado_Cerrada: 4,
        MantenimientoEstado_Anulada: 5,
        MantenimientoEstado_AsignadaParcial: 6,
        MantenimientoEstado_Asignada: 7,
        MantenimientoEstado_PendientePorRepuesto: 8,
        MantenimientoEstado_Iniciada: 9,
        MantenimientoEstado_Pausada: 10,
        //#endregion

        //#region Graficas
        Graficas_Consulta: 255,
        //#endregion

        //#region ProcesosJudiciales
        ProcesosJudiciales_ProcesoAseguradora: 161,
        //#endregion

        //#region Roles
        Seguridad_Rol_Administrador: 1,
        Seguridad_Rol_Administrador_Procesos_Judiciales: 55,
        Seguridad_Rol_Administrador_SITCAR: 62,
        //#endregion

        //#region TipoOperacion
        TipoOperacion_Troncal: 1,
        TipoOperacion_Dual: 5
        //#endregion

    }

    /// <summary>
    /// <Descripción>Ejecuta los WebeMethods del codebehind</Descripción>
    /// <parametros>
    /// <nombre>action</nombre> <Detalle>WebMethod que se ejecutará en el behind de la misma página</Detalle>
    /// <nombre>json</nombre> <Detalle>listado de propiedades, las cuales son las mismos parametros que recibe el WenMethod</Detalle>
    /// <nombre>ok</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue correcta</Detalle>
    /// <nombre>error</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue fallida</Detalle>
    /// <nombre>urlComplete</nombre> <Detalle>Nombre de la API que se debe ejecutar</Detalle>
    /// </parametros>
    /// </summary>
    this.EjecutarAjax = function (action, json, ok, error, urlComplete) {

        //var UrlApp = 'http://64.76.90.43:9094';
        var UrlApp = '';
        //var tokenKey = 'accessToken';

        //var token = localStorage.getItem(tokenKey);
        var headers = {};
        //if (token) {
        //    headers.Authorization = 'Bearer ' + token;
        //}

        var ruta = '';
        if (urlComplete !== undefined) {
            ruta = UrlApp + "/api" + urlComplete;
        }

        $.ajax({
            headers: headers,
            type: 'GET',
            url: ruta,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),

            success: function (retrieved) {
                if (retrieved.Message !== undefined) {
                    var str = retrieved.Message;

                    if (str.toLowerCase().indexOf("aut") >= 0) {
                        bootbox.dialog({
                            message: "Sesión finalizada",
                            title: "Sesión",
                            buttons: {
                                success: {
                                    label: "Ok",
                                    className: "warning",
                                    callback: function () {
                                        location.replace('Login.html');
                                    }
                                }
                            }
                        }
                        );
                    }
                }
                else {

                    if (urlComplete === '/Generico/ConsultaMenu') {
                        var datos = JSON.parse(retrieved);
                        if (datos.UsuarioNombre !== undefined && datos.UsuarioNombre === null) {
                            bootbox.dialog({
                                message: "Sesión finalizada",
                                title: "Sesión",
                                buttons: {
                                    success: {
                                        label: "Ok",
                                        className: "warning",
                                        callback: function () {
                                            location.replace('Login.html');
                                        }
                                    }
                                }
                            }
                            );
                        }
                        else {
                            ok(retrieved);
                        }
                    }
                    else {
                        ok(retrieved);
                    }
                }
            },
            error: function (ex) {
                location.replace('index.html');
                /*error ya no se ejecuta, debido al cambio que se realiza para que siempre se redireccione a la pagina de error*/
            }
        });


        //var settings = {
        //    "url": "http://localhost:32803/api/ProcesosMasivos/GetProcesoMasivosSP",
        //    "method": "GET",
        //    "timeout": 0,
        //};

        //$.ajax(settings).done(function (response) {
        //    console.log(response);
        //});
    },

    /// <summary>
    /// <Descripción>Ejecuta los WebeMethods del codebehind</Descripción>
    /// <parametros>
    /// <nombre>action</nombre> <Detalle>WebMethod que se ejecutará en el behind de la misma página</Detalle>
    /// <nombre>json</nombre> <Detalle>listado de propiedades, las cuales son las mismos parametros que recibe el WenMethod</Detalle>
    /// <nombre>ok</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue correcta</Detalle>
    /// <nombre>error</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue fallida</Detalle>
    /// <nombre>urlComplete</nombre> <Detalle>Nombre de la API que se debe ejecutar</Detalle>
    /// </parametros>
    /// </summary>
    this.EjecutarAjaxSincrono = function (action, json, ok, error, urlComplete) {

        //var UrlApp = 'http://64.76.90.43:9094';
        var UrlApp = '';
        var tokenKey = 'accessToken';

        var token = localStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var ruta = '';
        if (urlComplete !== undefined) {
            ruta = UrlApp + "/api" + urlComplete;
        }

        $.ajax({
            headers: headers,
            async: false,
            type: 'POST',
            url: ruta,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),

            success: function (retrieved) {
                if (retrieved.Message !== undefined) {
                    var str = retrieved.Message;

                    if (str.toLowerCase().indexOf("aut") >= 0) {
                        bootbox.dialog({
                            message: "Sesión finalizada",
                            title: "Sesión",
                            buttons: {
                                success: {
                                    label: "Ok",
                                    className: "warning",
                                    callback: function () {
                                        location.replace('Login.html');
                                    }
                                }
                            }
                        }
                        );
                    }
                }
                else {

                    if (urlComplete === '/Generico/ConsultaMenu') {
                        var datos = JSON.parse(retrieved);
                        if (datos.UsuarioNombre !== undefined && datos.UsuarioNombre === null) {
                            bootbox.dialog({
                                message: "Sesión finalizada",
                                title: "Sesión",
                                buttons: {
                                    success: {
                                        label: "Ok",
                                        className: "warning",
                                        callback: function () {
                                            location.replace('Login.html');
                                        }
                                    }
                                }
                            }
                            );
                        }
                        else {
                            ok(retrieved);
                        }
                    }
                    else {
                        ok(retrieved);
                    }
                }
            },
            error: function (ex) {
                location.replace('error.html');
                /*error ya no se ejecuta, debido al cambio que se realiza para que siempre se redireccione a la pagina de error*/
            }
        });
    },

    /// <summary>
    /// <Descripción>Ejecuta los WebeMethods del codebehind</Descripción>
    /// <parametros>
    /// <nombre>action</nombre> <Detalle>WebMethod que se ejecutará en el behind de la misma página</Detalle>
    /// <nombre>json</nombre> <Detalle>listado de propiedades, las cuales son las mismos parametros que recibe el WenMethod</Detalle>
    /// <nombre>ok</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue correcta</Detalle>
    /// <nombre>error</nombre> <Detalle>Función que se ejecuta si la conección al webmethod fue fallida</Detalle>
    /// <nombre>urlComplete</nombre> <Detalle>Nombre de la API que se debe ejecutar</Detalle>
    /// </parametros>
    /// </summary>
    this.EjecutarAjaxUploadFile = function (action, json, formData, fileInput, ok, error, urlComplete) {

        //var UrlApp = 'http://64.76.90.43:9094';
        var UrlApp = '';
        var tokenKey = 'accessToken';

        var token = localStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var ruta = '';
        if (urlComplete !== undefined) {
            ruta = UrlApp + "/api" + urlComplete;
        }

        $.ajax({
            headers: headers,
            url: ruta,
            type: "POST",
            data: formData,
            mimeTypes: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function (retrieved) {
                $(fileInput).val('');
                ok(retrieved);

            }, error: function (ex) {
                alert("Error UploadFile:" + ex);
            }
        });
    },

    /// <summary>
    /// <Descripción>Retorna el valor de un parametro en la URL</Descripción>
    /// <parametros>
    /// <nombre>sParam</nombre> <Detalle>Nombre del parametro a buscar en la URL</Detalle>
    /// </parametros>
    /// </summary>
    this.ValorParametroUrl = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            };
        };
    };

    /// <summary>
    /// <Descripción>Cierra todas las modales que se encuentren abiertas en la página</Descripción>
    /// </summary>
    this.CierraModales = function () {
        $(".modal-backdrop").remove();
        $(".modal, .fade, .in").remove();
    }

    /// <summary>
    /// <Descripción>Arroja un mensaje tipo alerta en la página</Descripción>
    /// <parametros>
    /// <nombre>texto</nombre> <Detalle>Mensaje a mostrar en el mensaje</Detalle>
    /// <nombre>tipo</nombre> <Detalle>Tipo de mensaje informativo, error, alerta </Detalle>
    /// <nombre>titulo</nombre> <Detalle>Titulo del mensaje</Detalle>
    /// </parametros>
    /// </summary>
    this.Mensajeria = function (texto, tipo, titulo) {
        var Mensaje = thisJs.CtrlMensaje,
        strTipo = '';
        if (tipo === 'success') {
            strTipo = 'lime';
        } else if (tipo === 'info') {
            strTipo = 'teal';
        } else if (tipo === 'warning') {
            strTipo = 'tangerine';
        } else if (tipo === 'danger') {
            strTipo = 'ruby';
        }
        Mensaje({
            time: 10000,
            style: strTipo,
            posVertical: 'top',
            posHorizontal: 'right',
            tittle: titulo,
            text: texto
        })
    }

    /// <summary>
    /// <Descripción>Arroja un mensaje tipo alerta en la página</Descripción>
    /// <parametros>
    /// <nombre>texto</nombre> <Detalle>Mensaje a mostrar en el mensaje</Detalle>
    /// <nombre>tipo</nombre> <Detalle>Tipo de mensaje informativo, error, alerta </Detalle>
    /// <nombre>titulo</nombre> <Detalle>Titulo del mensaje</Detalle>
    /// </parametros>
    /// </summary>
    this.PintarMensajeria = function (texto, tipo, titulo) {

        var colValidaciones = [];
        colValidaciones = texto.split('\r\n');
        $.each(colValidaciones, function (index, mensaje) {
            if (mensaje !== '') {
                var Mensaje = thisJs.CtrlMensaje,
                strTipo = '';
                if (tipo === 'success') {
                    strTipo = 'lime';
                } else if (tipo === 'info') {
                    strTipo = 'teal';
                } else if (tipo === 'warning') {
                    strTipo = 'tangerine';
                } else if (tipo === 'danger') {
                    strTipo = 'ruby';
                }
                Mensaje({
                    time: 18000,
                    style: strTipo,
                    posVertical: 'top',
                    posHorizontal: 'right',
                    tittle: titulo,
                    text: mensaje
                })
            }
        });


    }

    /// <summary>
    /// <Descripción>Convierte una fecha que se encuentre serializada en string a Date </Descripción>
    /// <parametros>
    /// <nombre>strFecha</nombre> <Detalle>Valor de la fecha en string a convertir</Detalle>
    /// </parametros>
    /// </summary>
    this.TextosFecha = function (strFecha) {
        if (strFecha.toString().indexOf("/") <= 0) {
            return strFecha;
        } else {
            return new Date(strFecha.split('/')[1] + '/' + strFecha.split('/')[0] + '/' + strFecha.split('/')[2]);
        }
    }

    /// <summary>
    /// <Descripción>Usado para los mensajes que se muestran como alertas</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrlMensaje = function (atributos) {
        var settings = {
            theme: atributos.style,
            sticky: (!$.isNumeric(atributos.time)),
            horizontalEdge: atributos.posHorizontal,
            verticalEdge: atributos.posVertical
        };

        if (atributos.tittle !== undefined) {
            settings.heading = atributos.tittle;
        }
        if ($.isNumeric(atributos.time)) {
            settings.life = atributos.time;
        }

        $.notific8('zindex', 11500);
        $.notific8($.trim(atributos.text), settings);
    }

    /// <summary>
    /// <Descripción>Mensaje modal con la imagen de espera</Descripción>
    /// <parametros>
    /// <nombre>texto</nombre> <Detalle>Texto a mostrar en la parte inferiro de la imagen</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalEspera = function (texto) {
        var CerrarModal = thisJs.CierraModales

        var dvModalEspera = $(
        '<div class="modal fade">' +
        '<div class="vertical-alignment-helper">' +
        '<div class="modal-dialog vertical-align-center">' +
        '<div class="modal-content" style="text-align: center;width:300px">' +
        '<div class="modal-body">' +
        '<img src="img/Cargando.gif">' +
        '<h3>' + texto + '</h3>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
        );

        if (dvModalEspera.modal !== undefined) {
            dvModalEspera.modal({ backdrop: 'static', keyboard: false });
        }

        var close = function () {
            dvModalEspera.modal('hide');
            CerrarModal();
        }
    }

    /// <summary>
    /// <Descripción>Ventana modal vacía </Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalVacia = function (atributos) {
        //atributos: {
        //ancho:, //Ancho de la modal
        //alto:, // Alto de la modal
        //titulo:, // Titulo de la modal
        //pagina: 'Llantas.aspx', // URL que se carga en la modal
        //contenido: $('<div></div>') // Controles que se agregan a la modal
        //fnAbrir: function(){},Función que se ejecuta al momento de abrir la modal
        //fnCerrar: function(){}, Función que se ejecuta al momento de cerrar la modal
        //fnActivar: function(){}, Función que se ejecuta al momento que la modal está activa
        //blnRetornaModal: true //Propiedad que permite devolver el modal creado
        //}

        thisJs.CierraModales()
        var divWindow = $('<div id="window"></div>'),
        fnAbrir = undefined,
        fnCerrar = undefined,
        fnActivar = undefined;

        if ($.isFunction(atributos.fnAbrir)) {
            fnAbrir = function (e) {
                atributos.fnAbrir(e);
            }
        };

        if ($.isFunction(atributos.fnCerrar)) {
            fnCerrar = function (e) {
                atributos.fnCerrar(e);
            }
        };

        if ($.isFunction(atributos.fnActivar)) {
            fnActivar = function (e) {
                atributos.fnActivar(e);
            }
        };

        if (atributos.contenido !== undefined) {
            divWindow.append(atributos.contenido)
        }

        divWindow.kendoWindow({
            height: (atributos.alto == undefined ? '350' : atributos.alto),
            width: (atributos.ancho == undefined ? '350' : atributos.ancho),
            title: atributos.titulo,
            content: (atributos.pagina == undefined ? undefined : atributos.pagina),
            modal: true,
            open: fnAbrir,
            activate: fnActivar,
            close: fnCerrar,
        });
        divWindow.data("kendoWindow").center();
        divWindow.data("kendoWindow").open();


        if (atributos.blnRetornaModal) {
            return divWindow.data("kendoWindow");
        }
    }

    /// <summary>
    /// <Descripción>Mensaje a mostrar despues de una acción</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalMensaje = function (atributos) {
        //atributos = {
        //Mensaje: 'Se han realizado los movimientos de manera correcta.', //Mensaje a mostrar
        //Titulo: 'Movimientos correcto',// Titulo del mensaje
        //fnAceptar: function(){},// Función a ejecutar al dar click en el botón Ok
        //}
        bootbox.dialog({
            message: atributos.Mensaje,
            title: atributos.Titulo,
            buttons: {
                success: {
                    label: "Ok",
                    className: "green",
                    callback: function () {
                        if ($.isFunction(atributos.fnAceptar)) {
                            atributos.fnAceptar();
                        }
                    }
                }
            }
        });
    }

    /// <summary>
    /// <Descripción>Crea un control tipo textbox, no recibe comillas sencillas</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrlTextbox = function (control, atributos) {
        //atributos{fnEnter, fnCambiaValor, blnObligatorio, strNombre, intLongitud, strAyuda, strTipo}
        var Mensaje = thisJs.Mensajeria
        control.attr('Maxlength', atributos.intLongitud);
        control.attr('class', 'k-textbox');
        if (atributos.strAyuda !== undefined) {
            control.attr('Placeholder', atributos.strAyuda);
        }
        control.obligatorio = function () {
            if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                control.value();
                if (control.val() === undefined || control.val() === '' || control.val().length <= 0) {
                    Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else if (control.val().length > atributos.intLongitud) {
                    control.removeAttr('Maxlength');
                    control.attr('Maxlength', atributos.intLongitud);
                    Mensaje('El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
        control.limpiar = function () {
            control.val('');
        }
        control.value = function (vlrActual) {
            var textoActual = '';
            if (vlrActual === undefined) {
                textoActual = $.trim(control.val());
            } else {
                textoActual = vlrActual;
            }

            if (textoActual.replace !== undefined) {
                textoActual = textoActual.replace(/'/g, "");
            }

            control.val(textoActual);
            if (vlrActual === undefined) {
                return textoActual;
            }
        }
        control.bloquear = function () {
            control.attr('readonly', true);
        }
        control.desBloquear = function () {
            control.attr('readonly', false);
        }
        control.bind('keypress', function (e) {
            if (e.keyCode === 39) {
                e.preventDefault();
            } else if (e.keyCode === 13 || e.which === 13) {
                if (atributos.fnEnter !== undefined) {
                    atributos.fnEnter();
                }
            }
        })
        control.bind('change', function () {
            if (atributos.fnCambiaValor !== undefined) {
                atributos.fnCambiaValor();
            }
        })
        control.bind('blur', function () {
            if (control.val() !== undefined && control.val() !== '' && control.val().length > 0) {
                if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                    control.obligatorio();
                } else {
                    control.value();
                    if (control.val().length > atributos.intLongitud) {
                        control.removeAttr('Maxlength');
                        control.attr('Maxlength', atributos.intLongitud);
                        control.focus();
                        Mensaje('El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.', 'warning', 'Campo ' + atributos.strNombre);
                    }
                }
            }
        })
        control.ValidaTipo = function () {
            if (control.val() !== undefined && control.val() !== null && control.val() !== '') {
                if (atributos.strTipo === 'correo') {
                    control.val(control.val().replace(/ /g, ''))
                    var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                    if (filter.test(control.val())) {
                        return true;
                    } else {
                        Mensaje('El campo ' + atributos.strNombre + ' no tiene el formato valido de correo', 'warning', 'Campo ' + atributos.strNombre);
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    /// <summary>
    /// <Descripción>Crea un control tipo textbox el cual solo recibe númerosde Kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrNumeric = function (control, atributos) {
        //atributos{
        //intDecimales:[Cantidad de decimales], 
        //intIncremento:[Cantidad de aumento al presionar la tecla de arriba o decremento al presionar la tecla abajo], 
        //strFormato:["C" = Moneda; "N" = Numerico Normal; "P"= Porcentaje]
        //numMaximo[valor maximo que lleva el campo]
        //numMinimo: [valor mínimo que lleva el campo],
        //blnObligatorio: false,
        //blnSpiner: false, // Indica si se muestra los botones para aumentar o disminuir el valor en el combo
        //strNombre: 'Numerico',
        //valor: 85, //Valor inicial del campo
        //fnCambiaValor:function(){},
        //strAyuda:'Guia para el usuario'
        //}

        var Mensaje = thisJs.Mensajeria;

        control.valor = undefined;
        control.attr('style', "width: 100%;");
        if (atributos.strAyuda !== undefined) {
            control.attr('Placeholder', atributos.strAyuda);
        }
        if (jQuery.isNumeric(atributos.numMaximo)) {
            var intLongitud = atributos.numMaximo.toString().length;
            if (jQuery.isNumeric(atributos.intDecimales)) {
                intLongitud += (1 + atributos.intDecimales)
            }
            control.attr('Maxlength', intLongitud);
        }
        if (jQuery.isNumeric(atributos.intDecimales) === false) {
            atributos.intDecimales = 0;
            atributos.strFormato = '#.#';
        }
        if (atributos.strFormato === 'C') {
            atributos.strFormato = 'c';
        } else if (atributos.strFormato === 'P') {
            atributos.strFormato = 'p0';
        } else if (atributos.strFormato === 'N') {
            atributos.strFormato = 'n';
        }
        var fnCambio = function (e) {
            if (jQuery.isFunction(atributos.fnCambiaValor) === true) {
                control.blur();
                atributos.fnCambiaValor();
            }
        };

        control.kendoNumericTextBox({
            format: atributos.strFormato,
            min: atributos.numMinimo,
            max: atributos.numMaximo,
            step: (jQuery.isNumeric(atributos.intIncremento === undefined) ? atributos.intIncremento : 10),
            decimals: atributos.intDecimales,
            spinners: (atributos.blnSpiner === true ? true : false),
            change: fnCambio
        });

        control.bind('keydown', function (e) {
            if (e.keyCode === 13 || e.keyCode === 9) {
                //control.blur();
            } else if (e.keyCode === 38 || e.keyCode === 40) {
                if (atributos.intIncremento !== undefined && jQuery.isNumeric(atributos.intIncremento) && parseFloat(atributos.intIncremento) > 0) {
                    var vlrActual = 0,
                    vlrIncre = atributos.intIncremento;

                    if (control.val() !== undefined && jQuery.isNumeric(control.val().replace(/[$,]/g, ''))) {
                        control.e0056 = parseFloat((control.val().replace(/[$,]/g, '')));
                    }

                    if (control.e0056 !== undefined && jQuery.isNumeric(control.e0056)) {
                        vlrActual = parseFloat(control.e0056);
                    };

                    if (e.keyCode === 38) {
                        if (parseFloat(vlrActual) < parseFloat(atributos.numMaximo)) {
                            control.e0056 = parseFloat(vlrActual + vlrIncre).toFixed(atributos.intDecimales);
                        }
                    } else {
                        if (parseFloat(vlrActual) > parseFloat(atributos.numMinimo)) {
                            control.e0056 = parseFloat(vlrActual - vlrIncre).toFixed(atributos.intDecimales);
                        }
                    }
                    control.val(control.e0056);
                    e.preventDefault();
                }
            }
        })
        control.bind('blur', function () {
            //control.val(control.data("kendoNumericTextBox").value());
            //if (jQuery.isNumeric(control.val())) {
            //    //control.value(control.val());
            //    //control.change();
            //} else {
            //    control.limpiar();
            //}
        })
        //control.bind('focus', function () {
        //    //control.val(control.valor);
        //    //control.valor = undefined;
        //})
        control.obligatorio = function () {
            if (jQuery.isNumeric(control[0].value.replace(",", "."))) {
                if (parseFloat(control[0].value.replace(",", ".")) > parseFloat(atributos.numMaximo)) {
                    if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                        Mensaje('El campo ' + atributos.strNombre + ' no debe ser mayor a ' + atributos.numMaximo, 'warning', 'Campo ' + atributos.strNombre);
                    }
                    return false;
                } else if (parseFloat(control[0].value.replace(",", ".")) < parseFloat(atributos.numMinimo)) {
                    if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                        Mensaje('El campo ' + atributos.strNombre + ' no debe ser menor a ' + atributos.numMinimo, 'warning', 'Campo ' + atributos.strNombre);
                    }
                    return false;
                } else {
                    return true;
                }
            } else {
                if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                    Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio y debe ser numérico.', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else {
                    return true;
                }
                control.limpiar();
            }
        }
        control.validar = function () {
            if (control.valor !== undefined && control.valor.length > 0 && jQuery.isNumeric(control.valor)) {
                if (parseFloat(control.valor) !== parseFloat(control.val().replace(/[$,]/g, ''))) {
                    control.limpiar();
                    return false;
                } else {
                    return true;
                }
            } else {
                control.limpiar();
                return false;
            }
        };
        control.value = function (value) {
            if (value === undefined) {
                return control.data("kendoNumericTextBox").value();
            } else {
                if (value === '' || !jQuery.isNumeric(value)) {
                    control.limpiar();
                } else {
                    control.valor = value;
                    if (parseFloat(control.valor) > parseFloat(atributos.numMaximo)) {
                        control.limpiar();
                    } else if (parseFloat(control.valor) < parseFloat(atributos.numMinimo)) {
                        control.limpiar();
                    } else {
                        control.data("kendoNumericTextBox").value(control.valor);
                    }
                }
            }
        }
        control.limpiar = function () {
            control.data("kendoNumericTextBox").value('');
            control.val('');
            control.valor = undefined;
        }
        control.bloquear = function () {
            control.data("kendoNumericTextBox").readonly(true);
        }
        control.desBloquear = function () {
            control.data("kendoNumericTextBox").readonly(false);
        }
        if (jQuery.isNumeric(atributos.valor)) {
            control.value(atributos.valor);
        }
    }

    /// <summary>
    /// <Descripción>Crea un control tipo datepicker de Kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrFecha = function (control, atributos) {
        //atributos{
        //fechaInhabil:['01/01/2016', '21/01/2016'], //Lista de fechas a deshabilitar como los festivos
        //diaInhabil:[0,6], //Lista de dias a deshabilitar como los sabados y domingos
        //inicial:'20/01/2016' //Fecha minima que se puede seleccionar
        //final:'25/01/2016' //Fecha maxima que se puede seleccionar
        //fecha:'25/01/2016' //Fecha seleccionada por defecto
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //strNombre: 'Fecha de Asignación',//Nombre del control para mostrar los mensajes
        //fnCambiaValor: //función al momento de cambiar el valor
        //}

        //JS-CSS Requerido
        //<link href="Content/bootstrap-datepicker.min.css" rel="stylesheet" />
        //<script src="Scripts/bootstrap-datepicker.min.js"></script>
        //<script src="Scripts/locales/bootstrap-datepicker.es.min.js"></script>

        var Mensaje = thisJs.Mensajeria,
        TextosFecha = thisJs.TextosFecha;

        control.attr('style', "width: 100%");
        //control.kendoMaskedTextBox({
        //    mask: "00/00/0000"
        //});
        control.kendoDatePicker({
            format: 'dd/MM/yyyy',
            max: atributos.inicial,
            min: atributos.final,
            change: (($.isFunction(atributos.fnCambiaValor) === true) ? function () {
                atributos.fnCambiaValor();
            } : undefined)
        });
        control.value = function (valor) {
            if (valor !== undefined) {
                control.data("kendoDatePicker").value(valor);
            } else {
                var datepicker = control.data("kendoDatePicker");
                return datepicker.value();
            }
        }
        control.limpiar = function () {
            control.value('');
        }

        control.bloquear = function () {
            control.data("kendoDatePicker").readonly(true)
            control.data("kendoDatePicker").enable(false);
        }
        control.desBloquear = function () {
            control.data("kendoDatePicker").readonly(false);
            control.data("kendoDatePicker").enable();
        }
        control.obligatorio = function () {
            var fecha = control.value();
            var blnSinValor = (fecha === null || fecha === undefined || new Date(fecha) === 'Invalid Date')
            if (atributos.blnObligatorio === true && atributos.blnEditar === true && blnSinValor === true) {
                Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else {
                if (!blnSinValor) {
                    if (atributos.inicial !== null || atributos.inicial !== undefined || new Date(atributos.inicial) !== 'Invalid Date') {
                        if (new Date(fecha) < new Date(atributos.inicial)) {
                            Mensaje('La fecha seleccionada en ' + atributos.strNombre + ' no debe ser menor a ' + atributos.inicial, 'warning', 'Campo ' + atributos.strNombre);
                            control.limpiar();
                            return false;
                        }
                    }
                    if (atributos.final !== null || atributos.final !== undefined || new Date(atributos.final) !== 'Invalid Date') {
                        if (new Date(fecha) > new Date(atributos.final)) {
                            Mensaje('La fecha seleccionada en ' + atributos.strNombre + ' no debe ser mayor a ' + atributos.inicial, 'warning', 'Campo ' + atributos.strNombre);
                            control.limpiar();
                            return false;
                        }
                    }
                    return true;
                } else {
                    control.limpiar();
                    return false;
                }
            }
        }
        if (atributos.fecha !== undefined) {
            control.value(atributos.fecha);//Establecer Fecha
        }
        if (atributos.inicial !== undefined && (new Date(atributos.inicial) !== 'Invalid Date')) {
            atributos.inicial = TextosFecha(atributos.inicial)
        } else {
            atributos.inicial = undefined;
        }
        if (atributos.final !== undefined) {
            atributos.final = TextosFecha(atributos.final);
        } else {
            atributos.final = undefined;
        }
    }

    /// <summary>
    /// <Descripción>Crea un control tipo Hora</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrHora = function (control, atributos) {
        //atributos{
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //minimo:'20/01/2016' //Fecha minima que se puede seleccionar
        //maximo:'25/01/2016' //Fecha maxima que se puede seleccionar
        //Hora:'05:30' // Hora por defecto en el control.
        //fnCambiaValor: //función al momento de cambiar el valor
        //}

        //JS-CSS Requerido
        //<link href="Content/bootstrap-clockpicker.min.css" rel="stylesheet" />
        //<script src="Scripts/bootstrap-clockpicker.min.js"></script>


        var Mensaje = thisJs.Mensajeria,
        id = control.get(0).id,
        controlHora,
        lblHora,
        vlrActual = (new Date('01/01/1900 ' + atributos.Hora)),
        vlrMinimo = (new Date('01/01/1900 ' + atributos.minimo)),
        vlrMaximo = (new Date('01/01/1900 ' + atributos.maximo));

        control.removeAttr('ID');
        control.attr('class', 'input-group clockpicker');

        controlHora = $('<input type="text" class="form-control" Maxlength = "5"/>');
        lblHora = $('<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>');

        control.append(controlHora).append(lblHora)

        //control.kendoTimePicker({
        //    autoclose: true,
        //    'default': (vlrActual.toString() !== 'Invalid Date' ? atributos.Hora : 'now')
        //});

        control.kendoDateTimePicker({
            autoclose: true,
            'default': (vlrActual.toString() !== 'Invalid Date' ? atributos.Hora : 'now')
            , interval: 60
            , format: "dd/MM/yyyy HH:mm"
            , timeFormat: "HH:mm"
        });

        control.valor = undefined;

        controlHora.bind('blur', function () {
            control.valor = undefined;
            if (controlHora.val() !== undefined && ((new Date('01/01/1900 ' + controlHora.val())).toString() !== 'Invalid Date')) {
                control.valor = controlHora.val();
                if (vlrMinimo.toString() !== 'Invalid Date') {
                    if ((new Date('01/01/1900 ' + controlHora.val())) < vlrMinimo) {
                        Mensaje('La hora seleccionada en ' + atributos.strNombre + ' es menor a la permitida que es ' + atributos.minimo + '.', 'warning', 'Campo ' + atributos.strNombre);
                        control.limpiar();
                    }
                }
                if (vlrMaximo.toString() !== 'Invalid Date') {
                    if ((new Date('01/01/1900 ' + controlHora.val())) > vlrMaximo) {
                        Mensaje('La hora seleccionada en ' + atributos.strNombre + ' es mayor a la permitida que es ' + atributos.maximo + '.', 'warning', 'Campo ' + atributos.strNombre);
                        control.limpiar();
                    }
                }
            } else {
                control.limpiar();
            }
        })
        controlHora.bind('change', function () {
            if (atributos.fnCambiaValor !== undefined) {
                atributos.fnCambiaValor();
            }
        })
        controlHora.bind('keydown', function (e) {
            if (!e.shiftKey) {
                if (e.keyCode === 13 || e.keyCode === 9) {
                    controlHora.blur();
                } else if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    if (!((e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 46)) {
                        if (e.keyCode !== 8) {
                            e.preventDefault();
                        }
                    }
                }
            }
        })
        controlHora.bind('keypress', function (e) {
            if (e.keyCode !== 58) {
                if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    if (!((e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 46)) {
                        if (e.keyCode !== 8) {
                            e.preventDefault();
                        }
                    }
                }
            } else if (e.keyCode === 58) {
                if (controlHora.val().split(':').length >= 2) {
                    e.preventDefault();
                }
            }

            if (controlHora.val().length === 2 && controlHora.val().indexOf(':') === -1) {
                controlHora.val(controlHora.val() + ":")
            }
        })

        control.obligatorio = function () {
            if (control.val() === undefined || control.val() === '') {
                Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else if ((moment(control.val(), "DD/MM/YYYY HH:mm").format().toString().toUpperCase() === 'INVALID DATE')) {
                Mensaje('La hora seleccionada en ' + atributos.strNombre + ' no tiene un formato valido.', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else if (vlrMinimo.toString() !== 'Invalid Date' && ((new Date(control.val())) < vlrMinimo)) {
                Mensaje('La hora seleccionada en ' + atributos.strNombre + ' es menor a la permitida que es ' + atributos.minimo + '.', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else if (vlrMaximo.toString() !== 'Invalid Date' && ((new Date(control.val())) > vlrMaximo)) {
                Mensaje('La hora seleccionada en ' + atributos.strNombre + ' es mayor a la permitida que es ' + atributos.maximo + '.', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else {
                if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                    if (control.val() === undefined || control.val() === '') {
                        Mensaje('El campo ' + atributos.strNombre + ' es obligatorio.', 'warning', 'Campo ' + atributos.strNombre);
                        control.limpiar();
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        control.limpiar = function () {
            control.val('');
            control.valor = undefined;
        }
        control.bloquear = function () {
            control.data("clockpicker").readonly(true)
        }
        control.desBloquear = function () {
            control.data("clockpicker").readonly(false)
        }

        if (atributos.Hora !== 'Invalid Date') {
            controlHora.val(atributos.Hora);
            controlHora.blur();
        }
    }

    /// <summary>
    /// <Descripción>Crea un control tipo combo de kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrCombo = function (control, atributos) {
        //atributos{
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //txtBusqueda: control, //Indica si contiene un control de busqueda para que sea limpiado
        //fnCambiaValor: //función al momento de cambiar el valor
        //}

        var Mensaje = thisJs.Mensajeria
        control.attr("placeholder", atributos.strAyuda).attr("style", "width: 100%;");

        control.kendoComboBox({
            placeholder: (atributos.strAyuda !== undefined ? atributos.strAyuda : 'Seleccione...'),
            dataTextField: atributos.display,
            dataValueField: atributos.value,
            dataSource: atributos.datos,
            serverFiltering: false,
            filter: "contains",
            suggest: true,
            select: function (e) {
                control.Seleccion = undefined;
                control.Valor = undefined;
                if (e.item !== undefined && e.item !== null) {
                    control.Seleccion = ObjetoKendo(this.dataItem(e.item.index()));
                    if (control.Seleccion === undefined && atributos.blnObligatorio === true && atributos.blnEditar === true) {
                        Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio.', 'warning', 'Campo ' + atributos.strNombre);
                    } else {
                        control.Valor = control.Seleccion[atributos.value];
                    }
                }
                if ($.isFunction(atributos.fnCambiaValor)) {
                    atributos.fnCambiaValor();
                }
            },
        }).data("kendoComboBox");

        control.Actualizadata = function (datas, blnNuevo) {
            var myVar = setInterval(function () {
                if (control.data("kendoComboBox") !== undefined) {
                    clearInterval(myVar);
                    var datos;

                    if (datas !== undefined) {
                        if (datas.Vistas === undefined) {
                            if (datas.Vista === undefined) {
                                atributos.datos = datas;
                                datos = datas;
                            }
                            else {
                                atributos.datos = datas.Vista;
                                datos = datas.Vista;
                            }

                        }
                        else {
                            atributos.datos = datas.Vistas;
                            datos = datas.Vistas
                        }


                        control.data("kendoComboBox").dataSource.data(datos);
                        control.data('kendoComboBox').refresh();
                    }
                }
            }, 250);
        }

        control.value = function (valor) {
            if (valor !== undefined) {
                var objExiste = Enumerable.From(atributos.datos).Where(function (ex) { return ex[atributos.value].toString() === valor.toString() }).FirstOrDefault();
                if (objExiste !== undefined && (objExiste[atributos.value].toString() === valor.toString())) {
                    control.Seleccion = objExiste;
                    control.Valor = valor;
                    control.data("kendoComboBox").value(valor);
                    if (atributos.txtBusqueda !== undefined) {
                        atributos.txtBusqueda.value(valor);
                    };
                } else {
                    control.limpiar();
                    if (atributos.txtBusqueda !== undefined) {
                        atributos.txtBusqueda.limpiar();
                    };
                }
            } else {
                return control.data("kendoComboBox").value();
            }
        }

        control.Asignarvalor = function (valor) {
            if (valor !== undefined) {

                setTimeout(function () {
                    control.value(valor);
                }, 500); //delay is in milliseconds 

            } else {
                return control.data("kendoComboBox").value();
            }
        }

        control.limpiar = function () {
            control.Seleccion = undefined;
            control.Valor = undefined;
            control.data("kendoComboBox").text('');
            control.data("kendoComboBox").value("");
            if (atributos.txtBusqueda !== undefined && $.isFunction(atributos.txtBusqueda.limpiar)) {
                atributos.txtBusqueda.limpiar();
            }
        }
        control.obligatorio = function () {
            if (atributos.blnObligatorio === true && (atributos.datos === undefined || atributos.datos.length <= 0) && atributos.blnEditar === true) {
                Mensaje('El campo ' + atributos.strNombre + ' no tiene información', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else if (atributos.blnObligatorio === true && control.Seleccion === undefined && atributos.blnEditar === true) {
                Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio.', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else {
                return true;
            }
        }
        control.bloquear = function () {
            control.data("kendoComboBox").readonly(true)
        }
        control.desBloquear = function () {
            control.data("kendoComboBox").readonly(false)
        }
        if (atributos.datos !== undefined && atributos.datos.length > 0) {
            control.Actualizadata(atributos.datos, true);
            control.value(atributos.vlrInicial);
        };

        control.SeleccionarRegistro = function (valor) {
            //controlCombo = $("#cboEstadoLaboral").data("kendoComboBox");
            controlCombo = control.data("kendoComboBox");
            controlCombo.select(function (dataItem) {
                x = dataItem;
                return dataItem.Id === valor;
            });
        }

        control.bind('blur', function () {
            if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                if (control.Valor == undefined) {
                    Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio.', 'warning', 'Campo ' + atributos.strNombre);
                    control.limpiar();
                }
            }
        });

    }


    this.CtrCheckBoxList = function (control, atributos) {
        //atributos{
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //txtBusqueda: control, //Indica si contiene un control de busqueda para que sea limpiado
        //fnCambiaValor: //función al momento de cambiar el valor
        //}

        var Mensaje = thisJs.Mensajeria

        control.attr("placeholder", atributos.strAyuda).attr("style", "width: 100%;");

        control.Actualizadata = function (datas, blnNuevo) {
            var myVar = setInterval(function () {

                clearInterval(myVar);
                var datos;
                var grupo = $('<div class="form-group">');
                var lista = $('<div class="mt-checkbox-list">');

                if (datas !== undefined) {
                    if (datas.Vistas === undefined) {
                        if (datas.Vista === undefined) {
                            atributos.datos = datas;
                            datos = datas;
                        }
                        else {
                            atributos.datos = datas.Vista;
                            datos = datas.Vista;
                        }
                    }
                    else {
                        atributos.datos = datas.Vistas;
                        datos = datas.Vistas
                    }

                    var cont = 1;
                    $.each(datos, function (i, registro) {
                        var check = $('<label class="mt-checkbox"></label>');
                        check.append(registro.nombre);
                        check.append('<input type="checkbox" class="chk" value="' + registro.id + '" id="' + 'chkFiltro_' + cont + '" />');
                        check.append('<span></span>');
                        lista.append(check);
                        cont = cont + 1;
                    });
                    grupo.append(lista);
                    control.append(grupo);

                }

            }, 250);
        }

        control.value = function (valor) {
            if (valor !== undefined) {
                //var objExiste = Enumerable.From(atributos.datos).Where(function (ex) { return ex[atributos.value].toString() === valor.toString() }).FirstOrDefault();
                //if (objExiste !== undefined && (objExiste[atributos.value].toString() === valor.toString())) {
                //    control.Seleccion = objExiste;
                //    control.Valor = valor;
                //    control.data("kendoComboBox").value(valor);
                //    if (atributos.txtBusqueda !== undefined) {
                //        atributos.txtBusqueda.value(valor);
                //    };
                //} else {
                //    control.limpiar();
                //    if (atributos.txtBusqueda !== undefined) {
                //        atributos.txtBusqueda.limpiar();
                //    };
                //}
                return valor;
            } else {
                return valor;
            }
        }
        control.limpiar = function () {
            control.Seleccion = undefined;
            control.Valor = undefined;
            control.data("kendoComboBox").text('');
            control.data("kendoComboBox").value("");
            if (atributos.txtBusqueda !== undefined && $.isFunction(atributos.txtBusqueda.limpiar)) {
                atributos.txtBusqueda.limpiar();
            }
        }
        control.obligatorio = function () {
            if (atributos.blnObligatorio === true && (atributos.datos === undefined || atributos.datos.length <= 0) && atributos.blnEditar === true) {
                Mensaje('El campo ' + atributos.strNombre + ' no tiene información', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else if (atributos.blnObligatorio === true && control.Seleccion === undefined && atributos.blnEditar === true) {
                Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio.', 'warning', 'Campo ' + atributos.strNombre);
                control.limpiar();
                return false;
            } else {
                return true;
            }
        }
        control.bloquear = function () {
            control.data("kendoComboBox").readonly(true)
        }
        control.desBloquear = function () {
            control.data("kendoComboBox").readonly(false)
        }
        if (atributos.datos !== undefined && atributos.datos.length > 0) {
            control.Actualizadata(atributos.datos, true);
            control.value(atributos.vlrInicial);
        };




    }

    /// <summary>
    /// <Descripción>Crea un control tipo combo de kendo con una caja de texto para que sea filtrado por el ID</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrComboFiltro = function (control, atributos) {
        //atributos{
        //alto:25,  //alto máximo del control textbox
        //fnBusca: false,//Busqueda en linea
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //fnCambiaValor: //función al momento de cambiar el valor

        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //fnCambiaValor: //función al momento de cambiar el valor
        //id: //Si tiene Id para la creación del input
        //}

        //JS-CSS Requerido
        //<link href="Content/bootstrap-select.min.css" rel="stylesheet" />
        //<script src="Scripts/bootstrap-select.min.js"></script>
        //<script src="Scripts/i18n/defaults-es_CL.min.js"></script>

        var EditarCombo = false;

        if (atributos.blnEditar !== undefined) {
            EditarCombo = atributos.blnEditar;
        }

        var dvtxt = $('<div class="col-xs-3 sinPaddingLateral"></div>'),
        dvcbo = $('<div class="col-xs-12 sinPaddingLateral"></div>'),
        txtBusqueda = undefined,
        cboBusqueda = $('<input/>');

        if (atributos.id !== undefined) {
            txtBusqueda = $('<input id="' + atributos.id + '"/>');
        }
        else {
            txtBusqueda = $('<input/>');
        }

        control.append(dvtxt).append(dvcbo);
        // dvtxt.append(txtBusqueda);
        dvcbo.append(cboBusqueda);

        thisJs.CtrNumeric(txtBusqueda, {
            intIncremento: 10,
            strFormato: "N",
            numMaximo: 999999999999999,
            numMinimo: 0,
            blnObligatorio: false,
            strNombre: atributos.strNombre,
            fnCambiaValor: function () {
                if ($.isNumeric(txtBusqueda.val())) {
                    cboBusqueda.value(txtBusqueda.val());
                    if (cboBusqueda.Seleccion === undefined) {
                        txtBusqueda.limpiar();
                    } else {

                        if ($.isFunction(atributos.fnCambiaValor) === true) {
                            atributos.fnCambiaValor();
                        }
                    }
                } else {
                    txtBusqueda.limpiar();
                    cboBusqueda.limpiar();

                }
            },
            strAyuda: 'ID'
        })
        thisJs.CtrCombo(cboBusqueda, {
            datos: atributos.datos,
            strAyuda: atributos.strAyuda,
            display: atributos.display,
            value: atributos.value,
            blnObligatorio: atributos.blnObligatorio,
            strNombre: atributos.strNombre,
            txtBusqueda: txtBusqueda,
            blnEditar: EditarCombo,
            fnCambiaValor: function () {
                if (cboBusqueda.Seleccion === undefined) {
                    txtBusqueda.limpiar();
                } else if ((txtBusqueda.valor === undefined) || (txtBusqueda.valor === null) || (txtBusqueda.valor.toString() !== cboBusqueda.Valor.toString())) {
                    txtBusqueda.value(cboBusqueda.Valor);
                }
                if ($.isFunction(atributos.fnCambiaValor) === true) {
                    atributos.fnCambiaValor();
                }
            }
        })

        if ($.isNumeric(atributos.alto)) {
            txtBusqueda.attr("style", "max-height: " + atributos.alto + "px !Important;");
        }

        cboBusqueda.fnBusca = function (blnBusca, objCombo) {
            var inputText = cboBusqueda.parent().find('input[type= text]');
            inputText.bind('keypress', function (e) {
                if (blnBusca === true) {
                    if ($(this).val().trim().length >= 3) {
                        var strBusqueda = $(this).val() + String.fromCharCode(e.keyCode);
                        $(this).val(strBusqueda);
                        $(this).blur();

                        var objBuscar = {};
                        var vista;

                        if (objCombo.id === null) {
                            if (objCombo.vista == null) {
                                vista = 0;
                            }
                            else {
                                vista = objCombo.vista;
                            }
                        }
                        else {
                            vista = objCombo.id;
                        }

                        var campo = undefined;

                        if (objCombo.tipoControl === 'Lista') {
                            campo = objCombo.display;
                        }
                        else {
                            campo = objCombo.campo;
                        }
                        objBuscar[campo] = $.trim(strBusqueda);

                        if (objCombo.filtros !== undefined) {
                            $.each(objCombo.filtros, function (i, registro) {
                                objBuscar[registro.campo] = registro.value;
                            });
                        }

                        if (objCombo.filtros !== undefined) {
                            $.each(objCombo.filtros, function (i, registro) {
                                objBuscar[registro.campo] = registro.value;
                            });
                        }

                        thisJs.ModalEspera('Filtrando...');
                        thisJs.EjecutarAjax('', { idVista: vista, strBusqueda: JSON.stringify(objBuscar) },
                        function (okFiltro) {
                            var colInfo = JSON.parse(okFiltro);
                            cboBusqueda.Actualizadata(colInfo.Vistas, false);
                            cboBusqueda.data("kendoComboBox").open();
                            cboBusqueda.data("kendoComboBox").input.focus();
                            thisJs.CierraModales();
                        },
                        function (bdFiltro) {
                            thisJs.CierraModales();
                        },
                        '/Generico/ConsultaString')
                    }
                }
            })
        }

        return cboBusqueda;
    }
    this.CtrComboFiltroJSONAsix = function (control, atributos) {
        //atributos{
        //alto:25,  //alto máximo del control textbox
        //fnBusca: false,//Busqueda en linea
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //fnCambiaValor: //función al momento de cambiar el valor

        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //fnCambiaValor: //función al momento de cambiar el valor
        //id: //Si tiene Id para la creación del input
        //}

        //JS-CSS Requerido
        //<link href="Content/bootstrap-select.min.css" rel="stylesheet" />
        //<script src="Scripts/bootstrap-select.min.js"></script>
        //<script src="Scripts/i18n/defaults-es_CL.min.js"></script>

        var EditarCombo = false;

        if (atributos.blnEditar !== undefined) {
            EditarCombo = atributos.blnEditar;
        }

        var dvtxt = $('<div class="col-xs-3 sinPaddingLateral  autocomplete="off""></div>'),
        dvcbo = $('<div class=" sinPaddingLateral  autocomplete="off""></div>'),
        txtBusqueda = undefined,
        cboBusqueda = $('<input />');

        if (atributos.id !== undefined) {
            txtBusqueda = $('<input id="' + atributos.id + '"/>');
        }
        else {
            txtBusqueda = $('<input/>');
        }

        control.append(dvtxt).append(dvcbo);
        // dvtxt.append(txtBusqueda);
        dvcbo.append(cboBusqueda);

        thisJs.CtrNumeric(txtBusqueda, {
            intIncremento: 10,
            strFormato: "N",
            numMaximo: 999999999999999,
            numMinimo: 0,
            blnObligatorio: false,
            strNombre: atributos.strNombre,
            fnCambiaValor: function () {
                if ($.isNumeric(txtBusqueda.val())) {
                    cboBusqueda.value(txtBusqueda.val());
                    if (cboBusqueda.Seleccion === undefined) {
                        txtBusqueda.limpiar();
                    } else {

                        if ($.isFunction(atributos.fnCambiaValor) === true) {
                            atributos.fnCambiaValor();
                        }
                    }
                } else {
                    txtBusqueda.limpiar();
                    cboBusqueda.limpiar();

                }
            },
            strAyuda: 'ID'
        })
        thisJs.CtrCombo(cboBusqueda, {
            datos: atributos.datos,
            strAyuda: atributos.strAyuda,
            display: atributos.display,
            value: atributos.value,
            blnObligatorio: atributos.blnObligatorio,
            strNombre: atributos.strNombre,
            txtBusqueda: txtBusqueda,
            blnEditar: EditarCombo,
            fnCambiaValor: function () {
                if (cboBusqueda.Seleccion === undefined) {
                    txtBusqueda.limpiar();
                } else if ((txtBusqueda.valor === undefined) || (txtBusqueda.valor === null) || (txtBusqueda.valor.toString() !== cboBusqueda.Valor.toString())) {
                    txtBusqueda.value(cboBusqueda.Valor);
                }
                if ($.isFunction(atributos.fnCambiaValor) === true) {
                    atributos.fnCambiaValor();
                }
            }
        })

        if ($.isNumeric(atributos.alto)) {
            txtBusqueda.attr("style", "max-height: " + atributos.alto + "px !Important;");
        }
        cboBusqueda.ActualizaParametros = function (newAtributes) {
            atributos.parametrosConsulta = newAtributes;
        }
        cboBusqueda.fnBusca = function (blnBusca, objCombo) {
            var inputText = cboBusqueda.parent().find('input[type= text]');
            inputText.bind('keypress', function (e) {
                if (blnBusca === true) {
                    if ($(this).val().trim().length == 3) {
                        var strBusqueda = $(this).val() + String.fromCharCode(e.keyCode);
                        $(this).val(strBusqueda);
                        $(this).blur();

                        var objBuscar = {};
                        var vista;

                        if (objCombo.id === null) {
                            if (objCombo.vista == null) {
                                vista = 0;
                            }
                            else {
                                vista = objCombo.vista;
                            }
                        }
                        else {
                            vista = objCombo.id;
                        }

                        var campo = undefined;

                        if (objCombo.tipoControl === 'Lista') {
                            campo = objCombo.display;
                        }
                        else {
                            campo = objCombo.campo;
                        }
                        atributos.parametrosConsulta.ParametroComboFiltro = $.trim(strBusqueda);

                        thisJs.ModalEspera('Filtrando...');
                        thisJs.EjecutarAjax('', { lstVistas: vista + ";", objBusqueda: JSON.stringify(atributos.parametrosConsulta) },
                        function (okFiltro) {
                            var colInfo = JSON.parse(okFiltro);
                            if (colInfo[0].Datos.Vistas === undefined) {
                                colInfo = JSON.parse(colInfo[0].Datos);
                            }
                            else {
                                colInfo = JSON.parse(colInfo[0].Datos.Vistas[0].JsonAxis);
                            }
                            cboBusqueda.Seleccion = undefined;
                            cboBusqueda.Actualizadata([]);
                            cboBusqueda.Actualizadata(colInfo, false);
                            cboBusqueda.data("kendoComboBox").open();
                            cboBusqueda.data("kendoComboBox").input.focus();
                            thisJs.CierraModales();
                        },
                        function (bdFiltro) {
                            thisJs.CierraModales();
                        },
                        atributos.strController)
                    }
                }
            })
        }

        return cboBusqueda;
    }
    /// <summary>
    /// <Descripción>Crea un control tipo seleccioón multíple de de kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>

    this.CtrMultipleCheck = function (control, atributos) {
        //atributos{
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al momento de mostrar la ayuda en el placeholder
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //fnCambiaValor: //función al momento de cambiar el valor
        //fnbtnBusqueda: function(){}/Si se envía alguna función, se crea el botón de busqueda
        //}
        var Mensaje = thisJs.Mensajeria
        if ($.isFunction(atributos.fnbtnBusqueda)) {
            var ddvPadre = control.parent(),
                dvcbo = $('<div class="col-xs-9 sinPaddingLateral"></div>'),
                dvbtn = $('<div class="col-xs-3 sinPaddingLateral"></div>'),
                btn = $('<button class="k-primary k-button" style="width: 100%;height: 2.1em;"><li class="fa fa-search"></li></button>');

            btn.bind('click', atributos.fnbtnBusqueda);
            ddvPadre.append(dvcbo, dvbtn);
            dvbtn.append(btn);
            dvcbo.append(control);
        };

        control.kendoMultiSelect({
            placeholder: atributos.strAyuda,
            dataTextField: atributos.display,
            dataValueField: atributos.value,
            dataSource: atributos.datos,
            autoClose: (atributos.autoClose === undefined ? false : atributos.autoClose),
            maxSelectedItems: (atributos.maxSelectedItems === undefined ? null : atributos.maxSelectedItems),
            deselect: function (e) {
                if ($.isFunction(atributos.fnCambiaValorDeseleccion)) {
                    if (e.dataItem !== undefined && e.dataItem !== null) {
                        atributos.fnCambiaValorDeseleccion(e.dataItem);
                    }
                }
            },
            select: function (e) {
                control.Seleccion = undefined;
                control.Valor = undefined;
                if (e.item !== undefined && e.item !== null) {
                    control.Seleccion = ObjetoKendo(this.dataItem(e.item.index()));
                    if (control.Seleccion === undefined && atributos.blnObligatorio === true && atributos.blnEditar === true) {
                        Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio.', 'warning', 'Campo ' + atributos.strNombre);
                    } else {
                        control.Valor = control.Seleccion[atributos.value];
                    }
                }
                if ($.isFunction(atributos.fnCambiaValor)) {
                    atributos.fnCambiaValor();
                }
            },
            filtering: function (e) {
                if (e.filter) {
                    var value = e.filter.value
                    var newFilter = {
                        filters: [
                            { field: atributos.display, operator: "contains", value: value },
                        ],
                        logic: "or"
                    }
                    e.sender.dataSource.filter(newFilter)
                    e.preventDefault()
                }
                e.preventDefault()
            },
        });

        control.Actualizadata = function (datas, blnSelecciona, blnLimpiaData) {
            var myVar = setInterval(function () {
                if (control.data("kendoMultiSelect") !== undefined) {
                    clearInterval(myVar);
                    var strValor = '';
                    if (blnLimpiaData === false) {
                        strValor = control.value();
                        $.each(datas, function (i, registro) {
                            if (Enumerable.From(atributos.datos).Count('x => x.' + atributos.value + ' === ' + registro[atributos.value]) <= 0) {
                                atributos.datos.push(registro);
                            };
                        });
                    } else {
                        atributos.datos = datas;
                    };
                    control.data("kendoMultiSelect").dataSource.data(atributos.datos);
                    control.data('kendoMultiSelect').refresh();

                    if (blnSelecciona === true) {
                        var strSeleccion = Enumerable.From(atributos.datos).Select('x => x.' + atributos.value).ToArray()
                        control.value(strSeleccion);
                    } else if (blnLimpiaData === false && strValor !== '') {
                        control.value(strValor.split(','));
                    };
                }
            }, 250);
        };
        control.fnBusca = function (blnBusca, objCombo) {
            var inputText = control.parent().find('.k-input');
            inputText.bind('keypress', function (e) {
                if (blnBusca === true) {
                    if ($(this).val().trim().length >= 3) {
                        var strBusqueda = $(this).val() + String.fromCharCode(e.keyCode);
                        $(this).val(strBusqueda);
                        $(this).blur();

                        var objBuscar = {};
                        var vista;

                        if (objCombo.id === null) {
                            if (objCombo.vista == null) {
                                vista = 0;
                            }
                            else {
                                vista = objCombo.vista;
                            }
                        }
                        else {
                            vista = objCombo.id;
                        }

                        var campo = undefined;

                        if (objCombo.tipoControl === 'Lista') {
                            //objCombo.servicio
                            campo = objCombo.display;
                        }
                        else {
                            campo = objCombo.campo;
                        }
                        objBuscar[campo] = $.trim(strBusqueda);

                        thisJs.ModalEspera('Filtrando...');
                        thisJs.EjecutarAjax('', { idVista: vista, strBusqueda: JSON.stringify(objBuscar) },
                        function (okFiltro) {
                            var colInfo = JSON.parse(okFiltro);
                            control.Actualizadata(colInfo.Vistas, false, false);
                            control.data("kendoMultiSelect").open();
                            thisJs.CierraModales();
                        },
                        function (bdFiltro) {
                            thisJs.CierraModales();
                        },
                        '/Generico/ConsultaString')
                    }
                }
            });
        };
        control.value = function (valores) {
            //valores = [1,2,3,4,5]// los id's a seleccionar deben ser un array
            if ($.isArray(valores)) {
                control.data("kendoMultiSelect").value(valores);
            } else {
                return control.data("kendoMultiSelect").value().toString();
            };
        };
        control.limpiar = function () {
            control.data("kendoMultiSelect").value('');
        };
        control.bloquear = function () {
            control.data("kendoMultiSelect").readonly(true)
        }
        control.desBloquear = function () {
            control.data("kendoMultiSelect").readonly(false)
        }
        control.obligatorio = function () {
            if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                control.value();
                if (control.val() === undefined || control.val() === '' || control.val().length <= 0) {
                    Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else if (control.val().length > atributos.intLongitud) {
                    control.removeAttr('Maxlength');
                    control.attr('Maxlength', atributos.intLongitud);
                    Mensaje('El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
        control.RetornaSeleccion = function (atributo) {
            var valores = ""
            var x = control.data("kendoMultiSelect").listView._dataItems;
            $.each(x, function (index, value) {
                if (x.length == index + 1) {
                    valores += value[atributo];
                } else {
                    valores += value[atributo] + ' ,';
                }
            });
            return valores;
        }

    };

    /// <summary>
    /// <Descripción>Crea un control tipo seleccioón multíple de de kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrMultipleFind = function (control, atributos) {
        //atributos{
        //strAyuda: 'Seleccione la comida deseada',// Texto que se mostrará al momento de mostrar la ayuda en el placeholder
        //display: 'texto',//Texto que se muestra en el combo
        //value: 'idCampo',//Valuemember que se aplica al campo
        //strNombre: 'Fecha de Entrada',//Nombre del control para mostrar los mensajes
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //datos:[{texto:'Arepa', valor: 1}, {texto:'Empanada', valor: 2}] //Lista de opciones que serán desplegadas en el combo
        //vlrInicial: '4', // Valor inicial que será seleccionado al pintar el combo
        //fnCambiaValor: //función al momento de cambiar el valor
        //fnbtnBusqueda: function(){}/Si se envía alguna función, se crea el botón de busqueda
        //}
        if ($.isFunction(atributos.fnbtnBusqueda)) {
            var ddvPadre = control.parent(),
                dvcbo = $('<div class="col-xs-9 sinPaddingLateral"></div>'),
                dvbtn = $('<div class="col-xs-3 sinPaddingLateral"></div>'),
                btn = $('<button class="k-primary k-button" style="width: 100%;height: 2.1em;"><li class="fa fa-search"></li></button>');

            btn.bind('click', atributos.fnbtnBusqueda);
            ddvPadre.append(dvcbo, dvbtn);
            dvbtn.append(btn);
            dvcbo.append(control);
        };

        control.kendoMultiSelect({
            placeholder: atributos.strAyuda,
            dataTextField: atributos.display,
            dataValueField: atributos.value,
            dataSource: atributos.datos,
            autoClose: false
        });

        control.Actualizadata = function (datas, blnSelecciona, blnLimpiaData) {
            var myVar = setInterval(function () {
                if (control.data("kendoMultiSelect") !== undefined) {
                    clearInterval(myVar);
                    var strValor = '';
                    if (blnLimpiaData === false) {
                        strValor = control.value();
                        $.each(datas, function (i, registro) {
                            if (Enumerable.From(atributos.datos).Count('x => x.' + atributos.value + ' === ' + registro[atributos.value]) <= 0) {
                                atributos.datos.push(registro);
                            };
                        });
                    } else {
                        atributos.datos = datas;
                    };
                    control.data("kendoMultiSelect").dataSource.data(atributos.datos);
                    control.data('kendoMultiSelect').refresh();

                    if (blnSelecciona === true) {
                        var strSeleccion = Enumerable.From(atributos.datos).Select('x => x.' + atributos.value).ToArray()
                        control.value(strSeleccion);
                    } else if (blnLimpiaData === false && strValor !== '') {
                        control.value(strValor.split(','));
                    };
                }
            }, 250);
        };

        control.fnBusca = function (blnBusca, objCombo) {
            var inputText = control.parent().find('.k-input');
            inputText.bind('keypress', function (e) {
                if (blnBusca === true) {
                    if ($(this).val().trim().length >= 3) {
                        var strBusqueda = $(this).val() + String.fromCharCode(e.keyCode);
                        $(this).val(strBusqueda);
                        $(this).blur();

                        var objBuscar = {};
                        var vista;

                        if (objCombo.id === null) {
                            if (objCombo.vista == null) {
                                vista = 0;
                            }
                            else {
                                vista = objCombo.vista;
                            }
                        }
                        else {
                            vista = objCombo.id;
                        }

                        var campo = undefined;

                        if (objCombo.tipoControl === 'Lista') {
                            //objCombo.servicio
                            campo = objCombo.display;
                        }
                        else {
                            campo = objCombo.campo;
                        }
                        objBuscar[campo] = $.trim(strBusqueda);

                        thisJs.ModalEspera('Filtrando...');
                        thisJs.EjecutarAjax('', { idVista: vista, strBusqueda: JSON.stringify(objBuscar) },
                        function (okFiltro) {
                            var colInfo = JSON.parse(okFiltro);
                            control.Actualizadata(colInfo.Vistas, false, false);
                            control.data("kendoMultiSelect").open();
                            thisJs.CierraModales();
                        },
                        function (bdFiltro) {
                            thisJs.CierraModales();
                        },
                        '/Generico/ConsultaString')
                    }
                }
            });
        };

        control.value = function (valores) {
            //valores = [1,2,3,4,5]// los id's a seleccionar deben ser un array
            if ($.isArray(valores)) {
                control.data("kendoMultiSelect").value(valores);
            } else {
                return control.data("kendoMultiSelect").value().toString();
            };
        };

        control.limpiar = function () {
            control.data("kendoMultiSelect").value('');
        };


        control.kendoMultiSelect({
            autoClose: false
        }).data("kendoMultiSelect");

    };

    /// <summary>
    /// <Descripción>Crea un control tipo grilla de kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrTabla = function (control, atributos) {
        //atributos{
        //fnAgregaRegistro:function(){},//Indica la función que se ejecuta para agregar un nuevo registro, si no se envía nada no se agrega el botón de nuevo
        //fnActualiza: function(){},//
        //fnElimina: function(){},//
        //fnDobleClickFila: function(){},//
        //fnDetails: function(){},//
        //blnChecks: true o False, //Indica si se muestra la columna de selección de la fila
        //exportar === true // Indica si se agrega o no el botón de exportar
        //blnFiltrar: true, // Indica si se muestra el filtro 
        //blnAgrupar: true, // Indica si se muestra la fila de agrupación
        //blnPaginacion: true, // Indica si se muestra la paginación 
        //blnEditable: true, // Indica si la celda es editable al presionar click sobre ellas
        //data:[],//información que se mostrará en la grilla
        //Height: 50%, alto deseado para la grilla
        //claseEditar: Valor del icono que se utiliza en la funcion de actualizar
        //ClaseArchivos: Valor del icono que se utiliza para la descargar de archivos o mensajes
        //columnas:[{
        // nombre:'Encabezado', //Texto que va en el header
        // id:'colEncabezado', // nombre del campo de los datos que estamos asociando
        // tipo:'numeric' 'fecha', 'logico',//Tipo de columna numeric o no enviar
        // blnIdentificador:true o false,//Indica si la columna de identificación
        // blnOrdenable:true o false,//Indica si la columna se puede ordenar
        // blnDescendente:true o false,//Indica si se carga en orden desecente la información inicialmente
        // blnVisible:true o false,//Indica si la columna es visible
        // alineacion:left,center o right,//Indica la alineación de la columna
        // filtra: true// indica si se crea un filtro para la colúmna sino se indica el tipo, por defecto se tomará texto
        // ancho: 50px// indica el ancho en px de la columna
        // EventoDatasource: Especifica si se puede editar el registro seleccionado(si no se especifica la propiedad en false, se permite la edición), se puede personalizar el método (dataSource_change) de acuerdo a la lógica de negocio que requiera el desarrollo en específico
        // strFormato:{
        //      True: 'Activo',//Si la columa es de tipo boolean, los valores con valor true se cambiarán por el valor que se encuentran en strFormato.True
        //      False:'Inactivo',//Si la columa es de tipo boolean, los valores con valor false se cambiarán por el valor que se encuentran en strFormato.False
        //      Fecha:'LLLL'},// Si la columna es de tipo fecha tener encuenta http://momentjs.com/
        //      FormatoCol: function (column, row) { // Es el cormato personalizado que se quiere para la columna
        //          if (row.Activo == true) {
        //              return "<span class= 'label label-success' > Activo </span>";
        //          } else {
        //              return "<span class= 'label label-danger' > Inactivo </span>";
        //          };
        //}
        // }]
        //}

        var NumeroFilas = 14;
        if (atributos.EventoDatasource == undefined) {
            atributos.EventoDatasource = true
        }
        if (atributos.MovimientoColumnas == undefined) {
            atributos.MovimientoColumnas = true;
        }
        if (atributos.NumeroFilas !== undefined) {
            NumeroFilas = atributos.NumeroFilas;
        }

        var ListaOpciones = [],
        chkSelectAll;
        if (atributos.id !== undefined) {
            chkSelectAll = $("<input type='checkbox' id='" + atributos.id + "' class='chkControl'/>");
        } else {
            chkSelectAll = $("<input type='checkbox' class='chkControl'/>");
        }



        var fnActualiza = function (e) {
            e.preventDefault();
            var dataItem = ObjetoKendo(this.dataItem($(e.currentTarget).closest("tr")));
            atributos.fnActualiza(dataItem);
        }


        var fnNotificaArchivos = function (e) {
            e.preventDefault();
            var dataItem = ObjetoKendo(this.dataItem($(e.currentTarget).closest("tr")));
            atributos.fnNotificaArchivos(dataItem);
        }


        var fnElimina = function (e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            atributos.fnElimina(dataItem);
        }

        var fnAcciones = function (e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            atributos.fnAcciones(dataItem);
        }

        control.fnResaltaRow = function (llave, valor, addClass, removeClass) {

            var dataItem = Enumerable.From(this.data("kendoGrid").dataSource._data).Where('x => x.' + llave + '== "' + valor + '"').FirstOrDefault();


            var row = this.data("kendoGrid")
                          .tbody
                          .find("tr[data-uid='" + dataItem.uid + "']");

            if (removeClass === true) {
                //row.removeAttr("class", "alert alert-danger");
                row.removeClass(addClass);
                //row.removeAttr("class");
            }
            else {
                row.addClass(addClass);
            }

            row = !row; // update row
        }

        function ValidateDate(dtValue) {
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            return dtRegex.test(dtValue);
        }

        function downloadCSV(csv, filename) {
            var csvFile;
            var downloadLink;

            // CSV file
            csvFile = new Blob([csv], { type: "text/csv" });

            // Download link
            downloadLink = document.createElement("a");

            // File name
            downloadLink.download = filename;

            // Create a link to the file
            downloadLink.href = window.URL.createObjectURL(csvFile);

            // Hide download link
            downloadLink.style.display = "none";

            // Add the link to DOM
            document.body.appendChild(downloadLink);

            // Click download link
            downloadLink.click();
        }

        var fnSelecciona = function (blnSelect) {
            Enumerable.From(control.data("kendoGrid").dataSource.data()).Select(function (e) { return e.rwSeleccionado = blnSelect }).ToArray();
            control.data('kendoGrid').refresh();

            if (blnSelect === true) {
                control.Seleccion = atributos.data;
            } else {
                control.Seleccion = [];
            }
        }

        if ($.isFunction(atributos.fnAcciones)) {
            atributos.columnas.push(
            {
                command: { text: "Acciones", click: fnAcciones },//<strong class='fa fa-trash-o'></strong>
                title: " ",
                width: "92px"
            }
            )
        }
        if ($.isFunction(atributos.fnElimina)) {
            atributos.columnas.unshift(
            {
                command: { text: "", name: "Eliminar", className: "fa fa-trash fa-2x", click: fnElimina },//<strong class='fa fa-trash-o'></strong>
                title: "Elimimar",
                width: "100px"
            }
            )
        }
        if ($.isFunction(atributos.fnActualiza)) {

            var claseEditar;
            if (atributos.claseEditar === undefined) {
                claseEditar = "fa fa-pencil-square fa-2x";
            }
            else {
                claseEditar = atributos.claseEditar;
            }

            atributos.columnas.unshift(
            {
                command: { text: "", name: "Editar", className: claseEditar, click: fnActualiza }, //<strong class='fa fa-pencil'></strong>
                title: "Editar",
                width: "100px"
            }
            )
        }
        if ($.isFunction(atributos.fnNotificaArchivos)) {

            var ClaseArchivos;
            if (atributos.ClaseArchivos === undefined) {
                ClaseArchivos = "fa fa-download";
            }
            else {
                ClaseArchivos = atributos.ClaseArchivos;
            }

            atributos.columnas.unshift(
            {
                command: { text: "", name: "Resultados", className: ClaseArchivos, click: fnNotificaArchivos }, //<strong class='fa fa-pencil'></strong>
                title: "Resultados",
                width: "100px"
            }
            )
        }
        if ($.isFunction(atributos.fnAgregaRegistro)) {
            ListaOpciones.push(' Nuevo');
        }
        if (atributos.exportar === true) {
            ListaOpciones.push('excel');
            ListaOpciones.push(' CSV');
        }
        if (atributos.blnChecks === true) {
            if (atributos.id !== undefined) {
                atributos.columnas.splice(0, 0, { template: "<input type='checkbox' id='" + atributos.id + "' class='chkControl chkControlFila chk" + control.attr('id') + "' #= rwSeleccionado === true ? \"checked='checked'\" : '' #/>", width: '50px' });
            } else {
                atributos.columnas.splice(0, 0, { template: "<input type='checkbox' class='chkControl chkControlFila chk" + control.attr('id') + "' #= rwSeleccionado === true ? \"checked='checked'\" : '' #/>", width: '50px' });
            }
            //atributos.columnas.splice(0, 0, { template: "<input type='checkbox' class='chkControl chkControlFila chk" + control.attr('id') + "' #= rwSeleccionado === true ? \"checked='checked'\" : '' #/>", width: '50px' });
        }
        if (ListaOpciones.length === 0) {
            ListaOpciones = undefined;
        }

        kendo.culture("es-CO");
        control.kendoGrid({
            toolbar: ListaOpciones,
            excel: {
                fileName: atributos.NombreExportable,
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: false,
                allPages: true,
            },
            pdf: {
                allPages: true,
                avoidLinks: true,
                paperSize: "letter",
                margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                landscape: true,
                repeatHeaders: true,
                scale: 0.8,
                fileName: atributos.NombreExportable,
            },
            dataSource: {
                pageSize: NumeroFilas,
                data: atributos.data
            },
            height: (atributos.Height === undefined ? 550 : atributos.Height),
            pageable: (atributos.blnPaginacion === false ? false : { buttonCount: NumeroFilas }),
            columns: atributos.columnas,
            sortable: true,
            groupable: (atributos.blnAgrupar === false ? false : true),
            filterable: (atributos.blnFiltrar === false ? false : {
                mode: "row"
            }),
            columnMenu: true,
            reorderable: atributos.MovimientoColumnas,
            resizable: true,
            editable: (atributos.blnEditable === true ? true : false),
            detailInit: ($.isFunction(atributos.fnDetails) === true ? function (e) {
                if ($.isFunction(atributos.fnDetails)) {
                    var objSeleccion = ObjetoKendo(e.data);
                    atributos.fnDetails({
                        tdDetalles: e.detailCell,
                        objSeleccionado: objSeleccion
                    });
                }
            } : null),
            edit: edit
        });

        function exportCSV(data) {
            //var grid = control.RetornaDatos();
            var grid = data;
            var lstColumns = control.data("kendoGrid").columns;
            var columns = Enumerable.From(lstColumns).Where(function (e) { return e.hidden == undefined && e.template == undefined && e.command == undefined }).ToArray();

            var csv = [];
            var rows = grid;
            if (rows.length > 0) {
                var encabezado = rows[0];
                var rowEncabezado = [];

                $.each(columns, function (index, values) {
                    rowEncabezado.push(values.title);
                });

                csv.push(rowEncabezado.join("|"));
            }
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i];

                $.each(columns, function (index, value) {

                    item = cols[value.field];
                    if (item != undefined) {

                        var valor = cols[value.field] + '';
                        valor = valor.replace('\n', '');
                        valor = valor.replace('\r', '\r\n');
                        valor = valor.replace('"', '\'');
                        valor = valor.replace(/(\r\n\t|\n|\r\t)/gm, "");
                        valor = valor.replace(/[\n\r]/g, '');
                        valor = valor.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
                        valor = valor.replace(/\t/g, ' ');
                        valor = valor.replace(/\|/g, '-');
                        valor = valor.replace('|', '-');
                        valor = valor.replace('null', '');

                        if (valor.length >= 10) {
                            var y = valor.substr(0, 4);
                            var d = valor.substr(5, 2);
                            var m = valor.substr(8, 2);
                            var x = valor.substr(10, 1);

                            if (x == "T") {
                                var fecha = d + "/" + m + "/" + y + ""
                                if (ValidateDate(fecha)) {
                                    valor = moment(valor).format('DD/MM/YYYY h:mm:ss');
                                }
                            }
                        }
                        row.push(valor);
                    }
                    else {
                        row.push("");
                    }
                })

                csv.push(row.join("|"));
            }
            // Download CSV file
            downloadCSV(csv.join("\n"), "Data.txt");
        }

        function dataSource_change(arg) {
            var data = this.data();
            if (data.length > 0) {
                control.actualizaSeleccion(arg.items[0]);
            }
        }

        if (atributos.EventoDatasource) {
            control.data("kendoGrid").dataSource.bind("change", dataSource_change);
        }

        if (atributos.EventoEnter) {
            control.on("click", "td", function (e) {
                var rowIndex = $(this).parent().index();
                var cellIndex = $(this).index();
                rowIndex = rowIndex + 1;
                cellIndex = cellIndex - 1;
                dataRow = $($(this).parent()[0]).data("uid")

                $("input").on("keydown", function (event) {
                    if (event.keyCode == 13) {
                        //Asigna el nuevo valor ingresado al DataSource de la grilla
                        obj = Enumerable.From(control.data("kendoGrid").dataSource.data()).Where(function (e) { return e.uid === dataRow }).FirstOrDefault()
                        obj[$(this)[0].name] = $(this)[0].value;
                        //Actualiza el DataSource de la grilla
                        control.actualizaSeleccion(obj);
                        //Seleccionar la caja de texto
                        var txtValor = $($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(control.data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
                        //Habilita el editar de la siguiente fila de la grilla
                        control.data("kendoGrid").editCell(txtValor);
                        //Evento click sobre la nueva fila para tener el foco 
                        txtValor.click();
                        event.keyCode = 0;
                        //Obtener la caja de texto
                        var txtControl = txtValor[0];
                        w = $(txtControl).find(".k-input");
                        w.select();
                    }
                });
            });
        }

        control.actualizaSeleccion = function (row) {
            if (row != undefined && control.Seleccion.length > 0 && row.rwSeleccionado === true) {
                //Elimina item actual
                control.Seleccion = Enumerable.From(control.Seleccion).Where(function (e) { return e.Id !== row.Id }).ToArray();
                //Vuelve asignar el valor a la seleccion con los datos modificados.
                var objSeleccion = {};
                objSeleccion = ObjetoKendo(row);
                control.Seleccion.push(objSeleccion);
            }
        }

        function edit(e, options) {
            if (e.container.context.cellIndex != undefined) {
                if (e.sender.columns[e.container.context.cellIndex].editable !== true) {
                    control.data("kendoGrid").closeCell();
                }
            }
        }

        control.RetornaDatos = function () {
            return control.data("kendoGrid").dataSource.data();
        }

        if (atributos.blnChecks === true) {
            var hdrSelectAll = control.data("kendoGrid").element.find('thead [role="row"] [data-role="droptarget"]')[0];

            $(hdrSelectAll).append(chkSelectAll);
            chkSelectAll.bind('click', function () {
                fnSelecciona(chkSelectAll[0].checked);
            })

            control.data("kendoGrid").table.on("click", ".chk" + control.attr('id'), selectRow);
            control.Seleccion = [];
            control.RetornaSeleccion = function () {
                return control.Seleccion;
            }
            control.Datos = function () {
                return control.data("kendoGrid").dataSource.data();
            }

            function selectRow() {
                var checked = this.checked,
                row = $(this).closest("tr"),
                dataItem = ObjetoKendo(control.data("kendoGrid").dataItem(row));

                if (checked) {
                    row.addClass("k-state-selected");
                    var objSeleccion = {};
                    objSeleccion = ObjetoKendo(dataItem);
                    control.Seleccion.push(objSeleccion);
                } else {
                    row.removeClass("k-state-selected");
                    chkSelectAll[0].checked = false;
                    control.Seleccion = Enumerable.From(control.Seleccion).Where(function (e) { return e.Id !== dataItem.Id }).ToArray();
                }

                var objselect = Enumerable.From(control.data("kendoGrid").dataSource.data()).Where(function (e) { return e.Id === dataItem.Id }).FirstOrDefault();
                objselect.rwSeleccionado = checked;
                if ($.isFunction(atributos.fnCeldaCheck)) {
                    atributos.fnCeldaCheck({
                        fila: row,
                        registro: dataItem,
                        checked: checked
                    });
                };
            }
        }

        if (atributos.blnExpandeFilaClick !== false) {
            control.on("click", "tr", function (e) {
                if ($.isFunction(atributos.fnDetails)) {
                    $(this).find("td.k-hierarchy-cell .k-icon").click();
                }
            });
        };

        control.find('.k-grid-Nuevo').bind('click', function () {
            atributos.fnAgregaRegistro();
        });
        $('.k-grid-Nuevo span').addClass('fa fa-plus');
        $('.k-grid-Nuevo span').text(' ');
        control.find('.k-grid-CSV').bind('click', function () {
            exportCSV();
        });
        $('.k-grid-Nuevo span').addClass('fa fa-plus');
        $('.k-grid-Nuevo span').text(' ');

        control.ExportarCSV = function (data) {
            exportCSV(data);
        }

        control.Actualizadata = function (data, blnSelecciona) {
            var myVar = setInterval(function () {
                if (control.data("kendoGrid") !== undefined) {
                    clearInterval(myVar);
                    control.Seleccion = [];

                    var datos;
                    if (data.Vistas === undefined) {
                        datos = { Vistas: data };
                    }
                    else {
                        datos = data;
                    }

                    atributos.data = datos.Vistas;
                    if (atributos.blnChecks === true) {
                        Enumerable.From(datos.Vistas).Select(function (e) { return e.rwSeleccionado = false }).ToArray();
                        control.data("kendoGrid").dataSource.data(datos.Vistas);
                        chkSelectAll[0].checked = false;
                    } else {
                        chkSelectAll.remove();
                        control.data("kendoGrid").dataSource.data(atributos.data);
                    }
                    control.data('kendoGrid').refresh();
                    if (blnSelecciona === true) {
                        chkSelectAll[0].checked = true;
                        fnSelecciona(true);
                    };
                }
            }, 250);
        }
        control.LimpiaSeleccion = function () {
            fnSelecciona(false);
        };
    }


    /// <summary>
    /// <Descripción>Crea un control tipo textarea</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrlTextArea = function (control, atributos) {
        //atributos{fnEnter, fnCambiaValor, blnObligatorio, strNombre, intLongitud, strAyuda, NoLineas}
        var Mensaje = thisJs.Mensajeria
        control.attr('Maxlength', atributos.intLongitud);

        if (atributos.NoLineas === undefined || !$.isNumeric(atributos.NoLineas)) {
            atributos.NoLineas = 5;
        }
        control.attr('rows', atributos.NoLineas);
        control.attr('class', "k-textbox");;

        if (atributos.strAyuda !== undefined) {
            control.attr('Placeholder', atributos.strAyuda);
        }
        control.obligatorio = function () {
            if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                control.value();
                if (control.val() === undefined || control.val() === '' || control.val().length <= 0) {
                    Mensaje('El campo ' + atributos.strNombre + ' no debe estar vacio', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else if (control.val().length > atributos.intLongitud) {
                    control.removeAttr('Maxlength');
                    control.attr('Maxlength', atributos.intLongitud);
                    Mensaje('El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.', 'warning', 'Campo ' + atributos.strNombre);
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
        control.value = function (vlrActual) {
            if (vlrActual === undefined) {
                textoActual = $.trim(control.val());
            } else {
                textoActual = vlrActual;
            }
            textoActual = textoActual.replace(/'/g, "");
            control.val(textoActual);
            if (vlrActual === undefined) {
                return textoActual;
            };
        }
        control.bind('keypress', function (e) {
            if (e.keyCode === 39) {
                e.preventDefault();
            } else if (e.keyCode === 13 || e.which === 13) {
                if (atributos.fnEnter !== undefined) {
                    atributos.fnEnter();
                }
            }
        })
        control.bind('change', function () {
            if (atributos.fnCambiaValor !== undefined) {
                atributos.fnCambiaValor();
            }
        })
        control.bind('blur', function () {
            if (control.val() !== undefined && control.val() !== '' && control.val().length > 0) {
                if (atributos.blnObligatorio === true && atributos.blnEditar === true) {
                    control.obligatorio();
                } else {
                    control.value();
                    if (control.val().length > atributos.intLongitud) {
                        control.removeAttr('Maxlength');
                        control.attr('Maxlength', atributos.intLongitud);
                        control.focus();
                        //control.val(control.val().substring(0, atributos.intLongitud))
                        Mensaje('El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.', 'warning', 'Campo ' + atributos.strNombre);
                    }
                }
            }
        })
        control.limpiar = function () {
            control.val('');
        }
    }

    /// <summary>
    /// <Descripción>Crea un control tipo checkbox/Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrCheck = function (control, atributos) {
        //atributos{
        //check: true, //Indica si se inicia como chequeado
        //fnCambiaValor: function(){},//Función al momento de realizar un cambio en el check
        //}

        if (atributos.texto !== undefined) {
            var dv = $('<div class="col-xs-6 col-sm-4 sinPaddingLateral"></div>'),
            dvchk = $('<div class="col-xs-2 sinPaddingLateral"></div>'),
            dvSpan = $('<div class="col-xs-10 sinPaddingLateral spanVerticalAlign"></div>')

            control.parent().append(dv);
            dvchk.append(control)
            dvSpan.append($("<span> " + atributos.texto + "</span>"))

            dv.append(dvchk, dvSpan)

        }

        control.removeAttr('class');
        control.attr('class', 'CheckSlide');
        var id = control.get(0).id,
        checkeado = (atributos.check === true ? 'checked' : ''),
        chk = $('<input type="checkbox" id="chk' + id + '" name="chk' + id + '" ' + checkeado + '/>'),
        LblChk = $('<label for="chk' + id + '"></label>')
        control.append(chk).append(LblChk);
        control.value = function (blnValor) {
            if (blnValor === undefined) {
                return control[0].children[0].checked;
            } else {
                control[0].children[0].checked = blnValor
            }
        }
        control.limpiar = function () {
            control.value(false);
        };
        control.bind('change', function () {
            if ($.isFunction(atributos.fnCambiaValor)) {
                atributos.fnCambiaValor();
            }
        })
    }

    /// <summary>
    /// <Descripción>Crea un control tipo radiobutton/Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrRadio = function (control, atributos) {
        //atributos{
        //texto: "Listo", // Texto adicionado al Radiobutton
        //Grupo: name, //Nombre del grupo al que pertenece el racio button
        //fnCambiaValor: function(){},//Función al momento de realizar un cambio en el check
        //}


        if (atributos.texto !== undefined) {
            var dv = $('<div class="col-xs-6 col-sm-4 col-lg-3 sinPaddingLateral"></div>'),
                dvchk = $('<div class="col-md-2 sinPaddingLateral"></div>'),
                dvSpan = $('<div class="col-md-10 sinPaddingLateral "></div>')

            control.parent().append(dv);
            dvchk.append(control)
            dvSpan.append($("<span> " + atributos.texto + "</span>"))

            dv.append(dvchk, dvSpan)

        }

        //atributos.Grupo
        control.removeAttr('class');
        control.attr('class', 'Rounded');
        var id = control.get(0).id,
            checkeado = (atributos.check === true ? 'checked' : ''),
            rdb = $('<input type="radio" id="rdb' + id + '" name="' + atributos.Grupo + '" ' + checkeado + '/>'),
            Lblrdb = $('<label for="rdb' + id + '"></label>')
        control.append(rdb).append(Lblrdb);
        control.value = function (blnValor) {
            if (blnValor === undefined) {
                return control[0].children[0].checked;
            } else {
                control[0].children[0].checked = blnValor
            }
        }


        control.bind('change', function () {
            if ($.isFunction(atributos.fnCambiaValor)) {
                atributos.fnCambiaValor();
            }
        })
    }

    /// <summary>
    /// <Descripción>Crea un control tipo datepicker de Kendo</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.CtrListBox = function (control, customerTemplate, atributos, customPlaceholder) {
        //atributos{
        //fechaInhabil:['01/01/2016', '21/01/2016'], //Lista de fechas a deshabilitar como los festivos
        //diaInhabil:[0,6], //Lista de dias a deshabilitar como los sabados y domingos
        //inicial:'20/01/2016' //Fecha minima que se puede seleccionar
        //final:'25/01/2016' //Fecha maxima que se puede seleccionar
        //fecha:'25/01/2016' //Fecha seleccionada por defecto
        //blnObligatorio:true o false, // indica si el campo es obligatorio
        //strNombre: 'Fecha de Asignación',//Nombre del control para mostrar los mensajes
        //fnCambiaValor: //función al momento de cambiar el valor
        //}

        //JS-CSS Requerido
        //<link href="Content/bootstrap-datepicker.min.css" rel="stylesheet" />
        //<script src="Scripts/bootstrap-datepicker.min.js"></script>
        //<script src="Scripts/locales/bootstrap-datepicker.es.min.js"></script>

        control.kendoListBox({
            dataTextField: "NombresPersona",
            dataValueField: "Identificacion",
            template: customerTemplate,
            dataSource: atributos,
            draggable: {
                placeholder: function (element) {
                    return element.clone().css({
                        "opacity": 0.3,
                        "border": "1px dashed #000000"
                    })
                }
            },
            dropSources: ["selected"],
            connectWith: "selected",
            toolbar: {
                position: "right",
                tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
            }
        });

        control.Actualizadata = function (datas, blnNuevo) {
            var myVar = setInterval(function () {
                if (control.data("kendoListBox") !== undefined) {
                    clearInterval(myVar);
                    var datos;

                    if (datas !== undefined) {
                        if (datas.Vistas === undefined) {
                            if (datas.Vista === undefined) {
                                atributos.datos = datas;
                                datos = datas;
                            }
                            else {
                                atributos.datos = datas.Vista;
                                datos = datas.Vista;
                            }

                        }
                        else {
                            atributos.datos = datas.Vistas;
                            datos = datas.Vistas
                        }


                        control.data("kendoListBox").dataSource.data(datos);
                        control.data('kendoListBox').refresh();
                    }
                }
            }, 250);
        }
    }

    /// <summary>
    /// <Descripción>Crea un control apartir de la vista</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.AdicionaControl = function (atributos) {
        //atributos = {
        //control: objVista,
        //dvContenedor: <div>,
        //}
        var dvPrincipal = $("<div class='col-md-6'></div>"),
            dvLabel = $("<div class='col-xs-5'></div>"),
            spanControl = $("<span>" + atributos.control.ServicioCampoDescripcion + "</span>"),
            dvControl = $("<div class='col-xs-7'></div>"),
            ctrControl = undefined,
            ctrlLista = undefined,
            tipoControl = undefined;

        dvLabel.append(spanControl);

        if (atributos.control.TipoServicioId === thisJs.ServicioEnum.TipoServicio_Transaccional) {

            if (atributos.control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista) {
                ctrControl = $("<div></div>");
                dvControl.append(ctrControl);
                dvPrincipal.append(dvLabel, dvControl);
                atributos.dvContenedor.append(dvPrincipal);
                atributos.control.ServicioCampoTipoDato = 'MultiSelect'

                var fnSeleccionaregistros = function (data) {
                    ctrControl.Actualizadata(data, true);
                };

                thisJs.CtrMultipleCheck(ctrControl, {
                    strAyuda: atributos.control.ServicioCampoAyuda,
                    display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
                    value: 'Id',
                    strNombre: atributos.control.ServicioCampoNombre,
                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                    autoClose: false,
                    fnbtnBusqueda: function () {
                        thisJs.ModalCrud({
                            IdVista: atributos.control.ServicioCampoRelacionadoId,
                            titulo: atributos.control.ServicioCampoNombre,
                            blnMuestraCheck: true,
                            fnTerminaSeleccion: fnSeleccionaregistros,
                            blnSeleccionaVarios: false
                        })
                    },
                    datos: []
                });

                tipoControl = 'MultiSelect';
            }
            else {
                if (atributos.control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista) {
                    ctrControl = $("<div  id='" + atributos.control.Id + "' ></div>");
                    dvControl.append(ctrControl);
                    dvPrincipal.append(dvLabel).append(dvControl);
                    atributos.dvContenedor.append(dvPrincipal);

                    ctrlLista = thisJs.CtrComboFiltro(ctrControl, {
                        datos: [],
                        strAyuda: atributos.control.ServicioCampoAyuda,
                        display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
                        value: 'Id',
                        blnEditar: atributos.control.ServicioCampoVisibleModificar,
                        blnObligatorio: atributos.control.ServicioCampoRequerido,
                        strNombre: atributos.control.ServicioCampoDescripcion
                    });

                    tipoControl = 'Lista';
                }
                else {

                    if (atributos.control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                        ctrControl = $("<div></div>");
                        dvControl.append(ctrControl);
                        dvPrincipal.append(dvLabel, dvControl);
                        atributos.dvContenedor.append(dvPrincipal);
                        atributos.control.ServicioCampoTipoDato = 'MultiSelect'

                        var fnSeleccionaregistros = function (data) {
                            ctrControl.Actualizadata(data, true);
                        };

                        thisJs.CtrMultipleFind(ctrControl, {
                            strAyuda: atributos.control.ServicioCampoAyuda,
                            display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
                            value: 'Id',
                            strNombre: atributos.control.ServicioCampoNombre,
                            blnEditar: atributos.control.ServicioCampoVisibleModificar,
                            blnObligatorio: atributos.control.ServicioCampoRequerido,
                            fnbtnBusqueda: function () {
                                thisJs.ModalFind({
                                    IdVista: atributos.control.ServicioCampoRelacionadoId,
                                    titulo: atributos.control.ServicioCampoNombre,
                                    blnMuestraCheck: true,
                                    fnTerminaSeleccion: fnSeleccionaregistros,
                                    blnSeleccionaVarios: false
                                })
                            },
                            datos: []
                        });

                        tipoControl = 'MultiSelect';
                    }
                    else {
                        tipoControl = 'Simple';
                        switch (atributos.control.ServicioCampoTipoDato) {
                            case "varchar":
                                ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                                dvControl.append(ctrControl);
                                thisJs.CtrlTextbox(ctrControl, {
                                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                                    strNombre: atributos.control.ServicioCampoDescripcion,
                                    intLongitud: atributos.control.ServicioCampoPrecision,
                                    strAyuda: atributos.control.ServicioCampoAyuda,
                                    strTipo: atributos.control.ServicioCampoExprRegular
                                });
                                break;
                            case "nvarchar":
                                ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                                dvControl.append(ctrControl);
                                thisJs.CtrlTextbox(ctrControl, {
                                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                                    strNombre: atributos.control.ServicioCampoDescripcion,
                                    intLongitud: atributos.control.ServicioCampoPrecision,
                                    strAyuda: atributos.control.ServicioCampoAyuda,
                                    strTipo: atributos.control.ServicioCampoExprRegular
                                });
                                break;
                            case "xml":
                                ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                                dvControl.append(ctrControl);
                                thisJs.CtrlTextbox(ctrControl, {
                                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                                    strNombre: atributos.control.ServicioCampoDescripcion,
                                    intLongitud: atributos.control.ServicioCampoPrecision,
                                    strAyuda: atributos.control.ServicioCampoAyuda,
                                    strTipo: atributos.control.ServicioCampoExprRegular
                                });
                                break;
                            case "datetime":
                                ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                                dvControl.append(ctrControl);
                                thisJs.CtrFecha(ctrControl, {
                                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                                    strAyuda: atributos.control.ServicioCampoAyuda,
                                    strNombre: atributos.control.ServicioCampoDescripcion
                                })
                                break;
                            case "bit":
                                ctrControl = $('<div id="' + atributos.control.Id + '"></div>');
                                thisJs.CtrCheck(ctrControl, {});
                                dvControl.append(ctrControl);
                                break;
                            default:  //smallint-int-bigint-float-numeric
                                ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                                dvControl.append(ctrControl);
                                var intDecimal = 0,
                                intMaximo = 0
                                if (atributos.control.ServicioCampoTipoDato === 'float' || atributos.control.ServicioCampoTipoDato === 'numeric') {
                                    intDecimal = atributos.control.ServicioCampoEscala;
                                    intMaximo = Array((atributos.control.ServicioCampoPrecision + 1) - intDecimal).join(9);
                                } else {
                                    intMaximo = Array(atributos.control.ServicioCampoPrecision + 1).join(9);
                                }
                                thisJs.CtrNumeric(ctrControl, {
                                    strAyuda: atributos.control.ServicioCampoAyuda,
                                    numMaximo: intMaximo,
                                    intDecimales: intDecimal,
                                    intIncremento: 0,
                                    numMinimo: 0,
                                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                                    strNombre: atributos.control.ServicioCampoDescripcion
                                })
                                break;
                        }
                    }
                }
            }
            dvPrincipal.append(dvLabel).append(dvControl);
            atributos.dvContenedor.append(dvPrincipal);
        } else if (atributos.control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista) {
            ctrControl = $("<div  id='" + atributos.control.Id + "' ></div>");
            dvControl.append(ctrControl);
            dvPrincipal.append(dvLabel).append(dvControl);
            atributos.dvContenedor.append(dvPrincipal);

            ctrlLista = thisJs.CtrComboFiltro(ctrControl, {
                datos: [],
                strAyuda: atributos.control.ServicioCampoAyuda,
                display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
                value: 'Id',
                blnEditar: atributos.control.ServicioCampoVisibleModificar,
                blnObligatorio: atributos.control.ServicioCampoRequerido,
                strNombre: atributos.control.ServicioCampoDescripcion
            });

            tipoControl = 'Lista';
        } else {

            if (atributos.control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                ctrControl = $("<div></div>");
                dvControl.append(ctrControl);
                dvPrincipal.append(dvLabel, dvControl);
                atributos.dvContenedor.append(dvPrincipal);
                atributos.control.ServicioCampoTipoDato = 'MultiSelect'

                var fnSeleccionaregistros = function (data) {
                    ctrControl.Actualizadata(data, true);
                };

                thisJs.CtrMultipleFind(ctrControl, {
                    strAyuda: atributos.control.ServicioCampoAyuda,
                    display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
                    value: 'Id',
                    strNombre: atributos.control.ServicioCampoNombre,
                    blnEditar: atributos.control.ServicioCampoVisibleModificar,
                    blnObligatorio: atributos.control.ServicioCampoRequerido,
                    fnbtnBusqueda: function () {
                        thisJs.ModalFind({
                            IdVista: atributos.control.ServicioCampoRelacionadoId,
                            titulo: atributos.control.ServicioCampoNombre,
                            blnMuestraCheck: true,
                            fnTerminaSeleccion: fnSeleccionaregistros,
                            blnSeleccionaVarios: false
                        })
                    },
                    datos: []
                });

                tipoControl = 'MultiSelect';
            }
            else {

                tipoControl = 'Simple';
                switch (atributos.control.ServicioCampoTipoDato) {
                    case "varchar":
                        ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                        dvControl.append(ctrControl);
                        thisJs.CtrlTextbox(ctrControl, {
                            blnEditar: atributos.control.ServicioCampoVisibleModificar,
                            blnObligatorio: atributos.control.ServicioCampoRequerido,
                            strNombre: atributos.control.ServicioCampoDescripcion,
                            intLongitud: atributos.control.ServicioCampoPrecision,
                            strAyuda: atributos.control.ServicioCampoAyuda,
                            strTipo: atributos.control.ServicioCampoExprRegular
                        });
                        break;
                    case "xml":
                        ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                        dvControl.append(ctrControl);
                        thisJs.CtrlTextbox(ctrControl, {
                            blnEditar: atributos.control.ServicioCampoVisibleModificar,
                            blnObligatorio: atributos.control.ServicioCampoRequerido,
                            strNombre: atributos.control.ServicioCampoDescripcion,
                            intLongitud: atributos.control.ServicioCampoPrecision,
                            strAyuda: atributos.control.ServicioCampoAyuda,
                            strTipo: atributos.control.ServicioCampoExprRegular
                        });
                        break;
                    case "nvarchar":
                        columnaGrilla.push({
                            field: control.ServicioCampoNombre,
                            title: control.ServicioCampoDescripcion,
                            filterable: {
                                cell: {
                                    operator: "contains"
                                }
                            },
                            width: '200px',
                            editable: false,
                            hidden: !control.ServicioCampoVisibleGrilla,
                        });
                        break;
                    case "datetime":
                        ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                        dvControl.append(ctrControl);
                        thisJs.CtrFecha(ctrControl, {
                            blnEditar: atributos.control.ServicioCampoVisibleModificar,
                            blnObligatorio: atributos.control.ServicioCampoRequerido,
                            strAyuda: atributos.control.ServicioCampoAyuda,
                            strNombre: atributos.control.ServicioCampoDescripcion
                        })
                        break;
                    case "bit":
                        ctrControl = $('<div id="' + atributos.control.Id + '"></div>');
                        thisJs.CtrCheck(ctrControl, {});
                        dvControl.append(ctrControl);
                        break;
                    default:  //smallint-int-bigint-float-numeric
                        ctrControl = $("<input id='" + atributos.control.Id + "'/>");
                        dvControl.append(ctrControl);
                        var intDecimal = 0,
                        intMaximo = 0
                        if (atributos.control.ServicioCampoTipoDato === 'float' || atributos.control.ServicioCampoTipoDato === 'numeric') {
                            intDecimal = atributos.control.ServicioCampoEscala;
                            intMaximo = Array((atributos.control.ServicioCampoPrecision + 1) - intDecimal).join(9);
                        } else {
                            intMaximo = Array(atributos.control.ServicioCampoPrecision + 1).join(9);
                        }
                        thisJs.CtrNumeric(ctrControl, {
                            strAyuda: atributos.control.ServicioCampoAyuda,
                            numMaximo: intMaximo,
                            intDecimales: intDecimal,
                            intIncremento: 0,
                            numMinimo: 0,
                            blnEditar: atributos.control.ServicioCampoVisibleModificar,
                            blnObligatorio: atributos.control.ServicioCampoRequerido,
                            strNombre: atributos.control.ServicioCampoDescripcion
                        })
                        break;
                }
            }
            dvPrincipal.append(dvLabel).append(dvControl);
            atributos.dvContenedor.append(dvPrincipal);
        };
        return {
            id: atributos.control.ServicioCampoRelacionadoId,
            vista: atributos.control.ServicioId,
            campo: atributos.control.ServicioCampoNombre,
            tipoDato: atributos.control.ServicioCampoTipoDato,
            tipoCampo: atributos.control.ServicioTipoCampoId,
            servicio: atributos.control.ServicioNombre,
            tipoControl: tipoControl,
            display: atributos.control.ServicioCampoServicioRelacionadoDisplay,
            control: (ctrlLista === undefined ? ctrControl : ctrlLista),
            TipoServicio: atributos.control.TipoServicioId
        };
    };

    /// <summary>
    /// <Descripción>Crea una grilla tipo kendo según la iformación recibida en los atributos</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.AdicionaTabla = function (atributos) {
        //atributos = {
        //dvTabla: <div>,
        //columnaExtra: [], //Coleccion de columnas que se adicionarán al final de la grilla,
        //colVista: [], //Coleccion de columnas que vienen desde la vista para pintar la grilla,
        //blnChecks: true, //Indica si se muestra las columnas de seleccion
        //fnAgregaRegistro:function(){},//Indica la función que se ejecuta para agregar un nuevo registro, si no se envía nada no se agrega el botón de nuevo
        //fnActualiza: function(){},// Si se envia la función, se debe activa la columna de edición
        //fnElimina: function(){},//Si se envia la función, se debe activa la columna de eliminación
        //fnDetails: function(){},//Indica si se despliega un content por fila
        //exportar: true, // Indica si se agrega o no el botón de exportar
        //blnAgrupar: true, // Indica si se muestra la fila de agrupación
        //blnFiltrar: true, // Indica si se muestra el filtro 
        //blnEditable: true, // Indica si las celdas son editables al presionar click sobre ellas
        //claseEditar: Valor del icono que se utiliza en la funcion de actualizar
        //ClaseArchivos: Valor del icono que se utiliza para la descargar de archivos o mensajes
        //}
        var columnaGrilla = [];
        atributos.colVista = Enumerable.From(atributos.colVista).OrderBy("x => x.ServicioCampoOrden").ToArray();
        $.each(atributos.colVista, function (i, control) {
            if (control.ServicioCampoVisibleGrilla === true || control.ServicioCampoVisibleGrillaAvanzada === true) {
                if (control.ServicioCampoOrden === 1 && control.ServicioCampoDescripcion === "Id") {
                    columnaGrilla.push({
                        field: "Id",
                        title: control.ServicioCampoDescripcion,
                        tipo: 'number',
                        width: '200px',
                        filterable: {
                            cell: {
                                operator: "gte"
                            }
                        },
                        editable: false,
                        blnIdentificador: true
                    });
                } else if (control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista || control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista || control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                    columnaGrilla.push({
                        field: control.ServicioCampoNombre,
                        title: control.ServicioCampoDescripcion,
                        tipo: 'number',
                        filterable: {
                            cell: {
                                operator: "gte"
                            }
                        },
                        width: '200px',
                        editable: false,
                        hidden: false
                    });
                } else {
                    switch (control.ServicioCampoTipoDato) {
                        case "varchar":
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                filterable: {
                                    cell: {
                                        operator: "contains"
                                    }
                                },
                                width: '200px',
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla,
                            });
                            break;
                        case "xml":
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                filterable: {
                                    cell: {
                                        operator: "contains"
                                    }
                                },
                                width: '200px',
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla,
                            });
                            break;
                        case "nvarchar":
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                filterable: {
                                    cell: {
                                        operator: "contains"
                                    }
                                },
                                width: '200px',
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla,
                            });
                            break;
                        case "datetime":
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                filterable: {
                                    cell: {
                                        operator: "contains"
                                    }
                                },
                                type: "date",
                                format: "{0:dd/MM/yyyy}",
                                width: '200px',
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla
                            });
                            break;
                        case "bit":
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                tipo: 'logico',
                                filterable: {
                                    cell: {
                                        operator: "contains"
                                    }
                                },
                                width: '200px',
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla,
                                template: '#= ' + control.ServicioCampoNombre + ' ? "Si" : "No"#'
                            });
                            break;
                        default:  //smallint-int-bigint-float-numeric
                            columnaGrilla.push({
                                field: control.ServicioCampoNombre,
                                title: control.ServicioCampoDescripcion,
                                type: "number",
                                width: '200px',
                                filterable: {
                                    cell: {
                                        operator: "gte"
                                    }
                                },
                                editable: false,
                                hidden: !control.ServicioCampoVisibleGrilla
                            });
                            break;
                    }
                }
            };
        });

        if ($.isArray(atributos.columnaExtra)) {
            $.each(atributos.columnaExtra, function (i, columna) {
                columnaGrilla.push(columna);
            })
        }

        thisJs.CtrTabla(atributos.dvTabla, {
            data: [],//información que se mostrará en la grilla
            columnas: columnaGrilla,
            fnAgregaRegistro: atributos.fnAgregaRegistro,
            fnActualiza: atributos.fnActualiza,
            fnElimina: atributos.fnElimina,
            fnDetails: atributos.fnDetails,
            blnChecks: atributos.blnChecks,
            exportar: atributos.exportar,
            blnFiltrar: atributos.blnFiltrar,
            blnAgrupar: atributos.blnAgrupar,
            blnPaginacion: atributos.blnPaginacion,
            blnEditable: atributos.blnEditable,
            blnExpandeFilaClick: atributos.blnExpandeFilaClick,
            fnCeldaCheck: atributos.fnCeldaCheck,
            claseEditar: atributos.claseEditar,
            ClaseArchivos: atributos.ClaseArchivos,
            fnNotificaArchivos: atributos.fnNotificaArchivos,
            Height: atributos.Height
        })
    };

    /// <summary>
    /// <Descripción>Función que se ejecuta al iniciar cualquier formulario del software</Descripción>
    /// </summary>
    this.IniciaJs = function () {
        var tblGrillaDatos = $("#dvData"),
        ContenPage = $("#ContenPage");

        //Crea los menús y submenús
        var fnPintaControl = function (okMenu) {
            okMenu = JSON.parse(okMenu);
            if ($.isArray(okMenu.colMenu.Vistas)) {

                var nombreUsuario = $("#nombreUsuario");
                nombreUsuario[0].innerText = okMenu.UsuarioNombre;
                if ($("#hdidBodegaNombre")[0] != undefined) {
                    $("#hdidBodegaNombre")[0].innerText = okMenu.UsuarioNombreBodega;
                }

                var mnUsuario = $("#mnUsuario"),
                colMenuPadre = [],
                colMenuHijo = [];
                $.each(okMenu.colMenu.Vistas, function (intMenu, objMenu) {
                    var objMnControl = undefined;
                    if (objMenu.MenuPadre === null) {
                        objMnControl = $('<li class="nav-item Padre" title = "' + objMenu.MenuToolTip + '"></li>');
                        var link = $('<a class="nav-link nav-toggle squema"></a>'),
                        spTitulo = $('<span class="title">' + objMenu.MenuNombre + '</span>'),
                        spFlecha = $('<span class="arrow"></span>');


                        if (objMenu.MenuIcono !== null && objMenu.MenuIcono !== '') {
                            link.append($('<i class="' + objMenu.MenuIcono + '"></i>'))
                        }

                        if (objMenu.MenuPath !== null && objMenu.MenuPath !== '' && objMenu.MenuPath !== undefined) {
                            link.bind('click', function () {

                                var path = objMenu.MenuPath;

                                //$("#navePage").load(path);

                                location.replace(path);

                            })
                        }

                        objMnControl.append(link.append(spTitulo, spFlecha));
                        colMenuPadre.push({
                            id: objMenu.Id,
                            control: objMnControl
                        });
                    } else {
                        objMnControl = $('<li class="nav-item"></li>')
                        var link = $('<a class="nav-link nav-toggle"></a>'),

                                Flecha = $('<span class="arrow"></span>'),

                        spTitulo = $('<span class="title">' + objMenu.MenuNombre + '</span>');

                        objMnControl.append(link.append(spTitulo, Flecha));

                        if (objMenu.MenuPath !== null && objMenu.MenuPath !== '' && objMenu.MenuPath !== undefined) {
                            objMnControl.bind('click', function () {
                                if ($.isNumeric(objMenu.ServicioId)) {

                                    fnSeleccionMenu(objMenu);

                                } else {

                                    var path = objMenu.MenuPath;

                                    //$("#navePage").load(path);

                                    location.replace(path);
                                };
                            });

                        }
                        colMenuHijo.push({
                            id: objMenu.Id,
                            idPadre: objMenu.MenuPadre,
                            idVista: objMenu.MenuPath.split('=')[1],
                            control: objMnControl
                        })
                    }
                })

                $.each(colMenuPadre, function (intMenu, padre) {
                    mnUsuario.append(padre.control);
                })

                var colHijoTemp = Enumerable.From(colMenuHijo).GroupBy("$.idPadre", null, function (key, g) { return { id: key, data: g.source }; }).ToArray();

                $.each(colHijoTemp, function (intMenu, hijo) {
                    var papa = Enumerable.From(colMenuPadre).Where(function (ct) { return ct.id === hijo.id }).FirstOrDefault(),
                    mnHijos = $('<ul class="sub-menu"></ul>');

                    if (papa === null || papa === undefined || papa.id !== hijo.id) {
                        papa = Enumerable.From(colMenuHijo).Where(function (ct) { return ct.id === hijo.id }).FirstOrDefault();
                    }

                    if (papa !== null && papa !== undefined && papa.id === hijo.id) {
                        papa.control.append(mnHijos);
                        $.each(hijo.data, function (inthijo, submenu) {
                            mnHijos.append(submenu.control);
                        })
                    }
                })
            }
            thisJs.CierraModales();
            if ($.isNumeric(okMenu.IdEspera)) {
                mnSeleccionado = Enumerable.From(okMenu.colMenu).Where('x => x.ServicioId === ' + okMenu.IdEspera).FirstOrDefault();
                if (mnSeleccionado !== null && mnSeleccionado !== undefined) {
                    fnSeleccionMenu(mnSeleccionado);
                };
            };
        };

        //Se ejecuta si se presentó un error con el WebMethod
        var fnFalla = function () {
            thisJs.CierraModales();
        };

        //Funsión que se ejeacuta al seleccionar un menú sin padre
        var fnSeleccionMenu = function (menu) {
            var vista = menu.ServicioId,
                blnRecargaPagina = false;

            thisJs.EjecutarAjax('', { idMenu: menu.Id }, function () {
                var path = menu.MenuPath;
                location.replace(path);

            }, function () { alert('Error'); }, '/Generico/MenuSeleccionado');

            //thisJs.PintaMenuSeleccionado({
            //    menu: menu,
            //    vista: vista,
            //    tblGrillaDatos: tblGrillaDatos,
            //    ContenPage: ContenPage
            //});
        }

        thisJs.ModalEspera('Cargando formulario...');
        thisJs.EjecutarAjax('', {}, fnPintaControl, fnFalla, '/Generico/ConsultaMenu');
    }

    /// <summary>
    /// <Descripción>Función que se ejecuta al iniciar Master.html Para el cargue de laos DashBoard</Descripción>
    /// </summary>
    this.IniciaDashBoardJs = function () {

        //Crea los menús y submenús
        var fnPintaControl = function (okMenu) {
            okMenu = JSON.parse(okMenu);
            if ($.isArray(okMenu.colMenu.Vistas)) {

                var nombreUsuario = $("#nombreUsuario");
                nombreUsuario[0].innerText = okMenu.UsuarioNombre;

                var ContenidoCompleto = '';

                var mnDash = $("#charttiles"),
                colMenuPadre = [],
                colMenuHijo = [];
                $.each(okMenu.colMenu.Vistas, function (intMenu, objMenu) {

                    if (objMenu.MenuAccesoRapido) {
                        ContenidoCompleto = ContenidoCompleto + '<div class="tile ' + objMenu.MenuClase + '">                       '
                                                              + '     <div class="tile-body">                                       '
                                                              + '           <i class="' + objMenu.MenuIcono + '"></i>               '
                                                              + '      </div>                                                       '
                                                              + '      <a href="' + objMenu.MenuPath + '" style="color:#FFFFFF;">   '
                                                              + '                                                                   '
                                                              + '          <div class="tile-object">                                '
                                                              + '              <div class="name"> ' + objMenu.MenuNombre + ' </div> '
                                                              + '              <div class="number"> </div>                          '
                                                              + '          </div>                                                   '
                                                              + '      </a>                                                         '
                                                              + ' </div>                                                            '
                    }
                })
            }
            thisJs.CierraModales();
            mnDash.append(ContenidoCompleto);
        };

        //Se ejecuta si se presentó un error con el WebMethod
        var fnFalla = function () {
            thisJs.CierraModales();
        };

        //Funsión que se ejeacuta al seleccionar un menú sin padre
        //var fnSeleccionMenu = function (menu) {
        //    var vista = menu.ServicioId,
        //        blnRecargaPagina = false;

        //    thisJs.EjecutarAjax('', { idMenu: menu.Id }, function () {
        //        var path = menu.MenuPath;
        //        location.replace(path);

        //    }, function () { alert('Error'); }, '/Generico/MenuSeleccionado');

        //    //thisJs.PintaMenuSeleccionado({
        //    //    menu: menu,
        //    //    vista: vista,
        //    //    tblGrillaDatos: tblGrillaDatos,
        //    //    ContenPage: ContenPage
        //    //});
        //}

        thisJs.ModalEspera('Cargando formulario...');
        thisJs.EjecutarAjax('', {}, fnPintaControl, fnFalla, '/Generico/ConsultaMenu');
    }


    /// <summary>
    /// <Descripción>Modal de una CRUD, usada generalmente para retornar asignaciones</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalCrud = function (atributos) {
        //atributos = {
        //    IdVista: atributos.control.ServicioCampoRelacionadoId, //Id de la vista a pintar
        //    titulo: atributos.control.ServicioCampoDescripcion, // titulo a mostrar
        //    blnMuestraCheck: true, //Indica si se debe mostrar la columna de selección
        //    fnTerminaSeleccion: function(){} función que se ejecuta al momento de dar click en el botón listo, retornando la lista de items seleccionados
        //}
        var dvPagina = $('<div></div>'),
            dvControl = $('<div style="display: none; height:80%"></div>'),
            dvGrilla = $('<div id = "dtl-' + atributos.IdVista + '"></div>'),
            btnRetornaSelccionado = $('<button class="k-primary k-button pull-right"><li class="fa fa-check"></li>  Listo</button>'),
            btnVerSeleccionado = $('<button class="k-primary k-button pull-right"><li class="fa fa-check-circle-o"></li>  Ver seleccionados</button>'),
            dvModal = undefined;

        var fnMuestraSeleccion = function () {
            var dvSeleccionLlanta = $('<div style="Height: 95%"></div>')
            thisJs.ModalVacia({
                ancho: "70%",
                alto: "70%",
                titulo: 'Registros seleccionados',
                contenido: dvSeleccionLlanta,
                fnCerrar: function (e) {
                    e.sender.element.empty();
                }
            })

            thisJs.AdicionaTabla({
                colVista: Enumerable.From(objInformacionServicioCrud.objServicio[0].ServicioCampoes).Where('x => x.ServicioCampoVisibleGrilla === true').ToArray(),
                dvTabla: dvSeleccionLlanta,
                blnAgrupar: false,
                Height: '95%'
            })
            dvSeleccionLlanta.Actualizadata(objInformacionServicioCrud.tabla.Seleccion);
        }

        dvPagina.append($('<div class = "row"></div>').append($('<div class="col-xs-12"></div>').append(btnRetornaSelccionado, btnVerSeleccionado)));
        dvPagina.append(dvControl, dvGrilla);

        dvModal = thisJs.ModalVacia({
            blnRetornaModal: true,
            ancho: '80%',
            alto: '80%',
            titulo: atributos.titulo,
            contenido: dvPagina,
            fnCerrar: function (e) {
                objInformacionServicioCrud = {};
                e.sender.element.empty();
            }
        });

        thisJs.PintaMenuSeleccionado({
            vista: atributos.IdVista,
            tblGrillaDatos: dvGrilla,
            ContenPage: dvControl,
            blnMuestraCheck: atributos.blnMuestraCheck,
            blnInformacionServicioCrud: true
        });

        btnVerSeleccionado.bind('click', function () {
            if (objInformacionServicioCrud.tabla.Seleccion.length <= 0) {
                thisJs.Mensajeria('No ha realizado ninguna selección.', 'warning', 'Seleccione los registros.');
            } else {
                fnMuestraSeleccion();
            }
        });
        btnRetornaSelccionado.bind('click', function () {
            atributos.fnTerminaSeleccion(objInformacionServicioCrud.tabla.Seleccion);
            dvModal.close();
        })
    };

    /// <summary>
    /// <Descripción>Modal de una CRUD, usada generalmente para retornar asignaciones</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalFind = function (atributos) {
        //atributos = {
        //    IdVista: atributos.control.ServicioCampoRelacionadoId, //Id de la vista a pintar
        //    titulo: atributos.control.ServicioCampoDescripcion, // titulo a mostrar
        //    blnMuestraCheck: true, //Indica si se debe mostrar la columna de selección
        //    fnTerminaSeleccion: function(){} función que se ejecuta al momento de dar click en el botón listo, retornando la lista de items seleccionados
        //    blnSeleccionaVarios: true Indica si puede seleccionar varios
        //}
        var dvPagina = $('<div></div>'),
            dvControl = $('<div class = "row" id = "ctrlBusqueda-' + atributos.IdVista + '"></div>'),
            dvGrilla = $('<div id = "dtl-' + atributos.IdVista + '"></div>'),
            btnRetornaSelccionado = $('<button class="k-primary k-button pull-right" style="margin: 5px;"><li class="fa fa-check"></li>  Listo</button>'),
            dvModal = undefined,
            colControl = [],
            colColumna = [],
            idServicioBusqueda = atributos.IdVista,
            tblDatosBusqueda = $('<div id="tbl-Detail-Busqueda"></div>');

        dvPagina.append($('<div class = "row"></div>').append($('<div class="col-xs-12"></div>').append(btnRetornaSelccionado)));
        dvPagina.append(dvControl);
        dvPagina.append(dvGrilla);


        dvModal = thisJs.ModalVacia({
            blnRetornaModal: true,
            ancho: '80%',
            alto: '80%',
            titulo: atributos.titulo,
            contenido: dvPagina,
            fnCerrar: function (e) {
                objInformacionServicioCrud = {};
                e.sender.element.empty();
            }
        });

        btnRetornaSelccionado.bind('click', function () {
            if (objInformacionServicioCrud.tabla === undefined) {
                thisJs.Mensajeria('Debe seleccionar un elemento', 'warning', 'Seleccione un registro.');
            }
            else {
                if (atributos.blnSeleccionaVarios === true) {
                    atributos.fnTerminaSeleccion(objInformacionServicioCrud.tabla.Seleccion);
                    dvModal.close();
                }
                else {
                    if (objInformacionServicioCrud.tabla.Seleccion.length > 1) {
                        thisJs.Mensajeria('Solo se puede seleccionar un elemento', 'warning', 'Seleccione un registro.');
                    }
                    else {
                        atributos.fnTerminaSeleccion(objInformacionServicioCrud.tabla.Seleccion);
                        dvModal.close();
                    }
                }
            }
        });

        /******************************************************************************************************************/
        /*Funcion para consultar los registros en la base de datos*/
        var fnModalBusqueda = function () {
            thisJs.ModalEspera('Filtrando...');
            var objBuscar = {};
            $.each(colControl, function (i, ctrl) {
                if (ctrl.tipoCampo !== undefined) {
                    var value;

                    if ($.isFunction(ctrl.control.value)) {
                        value = ctrl.control.value();
                    } else if (ctrl.control.Seleccion !== undefined) {
                        value = ctrl.control.Seleccion.Id;
                    } else if (ctrl.control.valor !== undefined && $.isNumeric(ctrl.control.valor)) {
                        if (parseInt(ctrl.control.valor) > 0) {
                            value = ctrl.control.valor;
                        };
                    };

                    if (value !== undefined && value !== null && value !== '') {
                        var campo = undefined;
                        if (ctrl.tipoDato === 'MultiSelect' || ctrl.tipoDato === 'Busqueda') {
                            campo = ctrl.servicio + 'Id';
                        }
                        else {
                            campo = ctrl.campo;
                        }
                        objBuscar[campo] = value;
                    };
                };
            });
            thisJs.EjecutarAjax(undefined, { idVista: idServicioBusqueda, filtros: JSON.stringify(objBuscar), objBusqueda: '' },
            function (okData) {
                okData = JSON.parse(okData);
                if (okData.OperacionExitosa === true && okData.ValidacionesNegocio === false) {
                    tblDatosBusqueda.Actualizadata(okData.Vistas);
                    objInformacionServicioCrud = {
                        tabla: tblDatosBusqueda,
                        objServicio: okData.Vistas
                    };
                    thisJs.CierraModales();
                } else {
                    if (okData.Mensaje !== undefined) {
                        thisJs.ModalMensaje({
                            Mensaje: okData.Mensaje,
                            Titulo: 'Consulta fallida'
                        });
                    }
                    else {
                        thisJs.ModalMensaje({
                            Mensaje: okData,
                            Titulo: 'Consulta fallida'
                        });
                    }

                };
            }, fnErrorBusqueda, '/Generico/ConsultaDatos')
        };

        /*Consulta los datos de las vistas tipo listas y que no sean TipoServicio transaccional*/
        var fnDataListaBusqueda = function (okData, objnewControl, longitud, indexFin) {
            /*Compruebo que el campo "Información" sea un objeto, de no ser así retorno el mensaje de la falla.*/
            try {
                okData = JSON.parse(okData);
            }
            catch (ex) {
                okData.OperacionExitosa = false;
                okData.Mensaje = okData.Vistas;
            }

            if (okData.OperacionExitosa === true && okData.ValidacionesNegocio === false) {
                objnewControl.control.Actualizadata(okData.Vistas);
                if (longitud === indexFin) {
                    thisJs.CierraModales();
                }
            } else {
                if (okData.OperacionExitosa === true && okData.ValidacionesNegocio === true) {
                    thisJs.CierraModales();
                    thisJs.Mensajeria(okData.Mensaje, 'warning', 'Validaciones ' + operacion);
                } else {
                    if (okData.OperacionExitosa === false && okData.ValidacionesNegocio === false) {
                        location.replace('error.html?strError=' + okData.Mensaje);
                    }
                }
            }
        };

        /*Crea la tabla con las columnas de la vista las cuales en ServicioCampoVisibleGrillaAvanzada sea igual a true*/
        var fnCreaTablaBusqueda = function (lstColumna) {
            dvGrilla.append(tblDatosBusqueda);
            thisJs.AdicionaTabla({
                colVista: lstColumna,
                dvTabla: tblDatosBusqueda,
                blnChecks: true,
                exportar: false,
                blnFiltrar: true
            });
        };

        /*Adhiere los controles al formulario*/
        var fnPintaControlesBusqueda = function (lstControl) {

            var cantidadControlesBusqueda = Enumerable.From(lstControl).Count('x => x.TipoServicioId === ' + thisJs.ServicioEnum.TipoServicio_Parametrica + ' && x.ServicioTipoCampoId === ' + thisJs.ServicioEnum.ServicioTipoCampo_Lista);
            var controlesParametricosLista = Enumerable.From(lstControl).Where('x => x.TipoServicioId === ' + thisJs.ServicioEnum.TipoServicio_Parametrica + ' && x.ServicioTipoCampoId === ' + thisJs.ServicioEnum.ServicioTipoCampo_Lista).ToArray();
            var cantidadControlesBusqueda2 = Enumerable.From(lstControl).Count('x => x.TipoServicioId !== ' + thisJs.ServicioEnum.TipoServicio_Parametrica);
            var controlesNoParametricos = Enumerable.From(lstControl).Where('x => x.TipoServicioId !== ' + thisJs.ServicioEnum.TipoServicio_Parametrica).ToArray();

            var busquedaTransaccional = false;

            $.each(controlesParametricosLista, function (i, vista) {
                var objnewControl = thisJs.AdicionaControl({
                    control: vista,
                    dvContenedor: dvControl,
                });
                colControl.push(objnewControl);

                if (vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista || vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista || vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                    if (vista.TipoServicioId !== thisJs.ServicioEnum.TipoServicio_Transaccional) {
                        busquedaTransaccional = true;
                        thisJs.EjecutarAjax(undefined, { idVista: vista.ServicioCampoRelacionadoId, filtros: '', objBusqueda: '' }, function (ok) { fnDataListaBusqueda(ok, objnewControl, cantidadControlesBusqueda, (i + 1)) }, fnErrorBusqueda, '/Generico/ConsultaDatos');
                    } else {
                        objnewControl.control.fnBusca(true, objnewControl);
                    }
                }
            });

            $.each(controlesNoParametricos, function (i, vista) {
                var objnewControl = thisJs.AdicionaControl({
                    control: vista,
                    dvContenedor: dvControl,
                });
                colControl.push(objnewControl);

                if (vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista || vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista || vista.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                    if (vista.TipoServicioId !== thisJs.ServicioEnum.TipoServicio_Transaccional) {
                        busquedaTransaccional = true;
                        thisJs.EjecutarAjax(undefined, { idVista: vista.ServicioCampoRelacionadoId, filtros: '', objBusqueda: '' }, function (ok) { fnDataListaBusqueda(ok, objnewControl, cantidadControlesBusqueda2, (i + 1)) }, fnErrorBusqueda, '/Generico/ConsultaDatos');
                    } else {
                        objnewControl.control.fnBusca(true, objnewControl);
                    }
                }
            });

            var dvButtons = $('<div class="col-xs-12" style="padding-top:20px"></div>'),
                dvButton2 = $('<div class="col-xs-12"></div>'),
                btnCancelar = $('<button class="k-primary k-button pull-right"><li class="fa fa-eraser"></li>  Limpiar</button>'),
                btnBuscar = $('<button class="k-primary k-button pull-right"><li class="fa fa-search"></li>  Buscar</button>');
            dvButtons.append(dvButton2.append(btnCancelar, btnBuscar));
            dvControl.append(dvButtons)
            btnBuscar.bind('click', function () {
                fnModalBusqueda();
            })
            btnCancelar.bind('click', function () {
                $.each(colControl, function (ct, control) {
                    if ($.isFunction(control.control.limpiar)) {
                        control.control.limpiar();
                    }
                })
            })

            if (busquedaTransaccional === false) {
                thisJs.CierraModales();
            }
        };

        /*Se ejecuta despues de realizar el prime ajax IniciaFormulario*/
        var fnPintaBusqueda = function (OkRespuesta) {
            OkRespuesta = JSON.parse(OkRespuesta);
            OkRespuesta.Control = JSON.parse(OkRespuesta.Control);
            OkRespuesta.Columna = JSON.parse(OkRespuesta.Columna);
            fnCreaTablaBusqueda(OkRespuesta.Columna.Vistas);
            fnPintaControlesBusqueda(OkRespuesta.Control.Vistas);
        };

        /*Función que se ejecuta cuando falla un ajax*/
        var fnErrorBusqueda = function (bdInicio) {
            thisJs.Mensajeria('No se ejecuto la busqueda.', 'warning', 'Error al cargar la busqueda');
        };

        thisJs.ModalEspera('Cargando formulario...');
        thisJs.EjecutarAjax('', { idVistaBusqueda: idServicioBusqueda }, fnPintaBusqueda, fnErrorBusqueda, '/Generico/IniciaBusqueda');
    };

    /// <summary>
    /// <Descripción>Crea los controles y grillas</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.PintaControles = function (lstControles, strVistas) {
        //lstControles = {
        //  dvContenedor: '', //Div donde se crearán los controles
        //  dvTabla: '', //Tabla donde se mostrarán los registros
        //  fnTerminaControles: function(colControles, strVistas){}, //Tabla donde se mostrarán los registros, enviando la lista de controles creados y el id de la vista consultada
        //  fnGuardaInformacion: function (objGuardar, vista) { }, // Función que se ejecutará despues de validar todos los campos, retornando el objeto a guardar, según los controles del formulario y el identificador de la vista 
        //  fnLimpiarInformacion: function (objGuardar, vista) { }, // Función que se ejecutará despues limpiar todos los campos;
        //  fnEliminaRegistro: function (objGuardar, vista) { }, // Función para eliminar los registros en la base de datos
        //  fnActualizaRegistro: function (objGuardar, vista) { }, // Función para actualizar los registros en la base de datos
        //  idServicioPadre: 5, //Indica si viene desde unaasignación
        //  filtros={};
        //  blnMuestraCheck: true //Indica si se muestra la columna de checkbox y si adicionalmente se retorna la lista de columnas creadas
        //  blnInformacionServicioCrud: true // Indica si asigna la tabla  y las columnas creadas al objInformacionServicioCrud
        //}
        var columnaGrilla = [],
        colControles = [];

        thisJs.ModalEspera('Cargando formulario...');
        thisJs.EjecutarAjax('', { idVista: strVistas },
        function (okConsulta) {
            okConsulta = JSON.parse(okConsulta);
            if (okConsulta.OperacionExitosa === false) {
                location.replace('error.html');
            } else {
                if (okConsulta.Vistas[0].ServicioCampoes.length > 0) {
                    var IdEdicion = undefined,
                    colVista = okConsulta.Vistas,
                    colControlEdicion = [],
                    colControlAdicion = []; // Lista de controles los cuales en la tabla ServicioCampo, la propiedad ServicioCampoVisibleModificar es true

                    var tblDatos = $('<div id="tbl-' + strVistas + '"></div>');
                    lstControles.dvTabla.append(tblDatos);

                    //Función para actualizar un registro, el cual recibe el id del registro a actualizar y llena los controles con la data
                    var fnActualizaRegistro = function (objActualiza) {
                        fnLimpia(true);

                        $.each(colControles, function (cl, control) {
                            if ($.isFunction(control.control.value)) {

                                if (control.TipoServicio === thisJs.ServicioEnum.TipoServicio_Transaccional && (control.tipoCampo === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista || control.tipoCampo === thisJs.ServicioEnum.ServicioTipoCampo_Lista || control.tipoCampo === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda)) {
                                    var objBuscar = {};
                                    var vista = control.id;
                                    var campoRelacionado = control.CampoRelacionado;
                                    var campoConsulta = 'Id';

                                    objBuscar[campoConsulta] = objActualiza[campoRelacionado];

                                    thisJs.EjecutarAjax('', { idVista: vista, strBusqueda: JSON.stringify(objBuscar) },
                                    function (okFiltro) {
                                        var colInfo = JSON.parse(okFiltro);

                                        if (objActualiza[campoRelacionado] !== null) {
                                            control.control.Actualizadata(colInfo.Vistas, true);
                                            control.control.value(objActualiza[campoRelacionado]);
                                        };
                                    },
                                    function (bdFiltro) {
                                    },
                                    '/Generico/ConsultaString')
                                }
                                else {
                                    if (objActualiza[control.campo] !== null) {
                                        control.control.value(objActualiza[control.campo]);
                                    };
                                }
                            };
                        });

                        $.each(colControlAdicion, function (cl, control) {
                            control.control.fadeIn();
                        });

                        $.each(colControlEdicion, function (cl, control) {
                            control.control.fadeOut();
                        })
                        IdEdicion = objActualiza.Id;
                    };

                    //Función para limpiar los controles de la tabla
                    var fnLimpia = function (blnCrea) {
                        if (blnCrea === true) {
                            lstControles.dvTabla.fadeOut(function () {
                                lstControles.dvContenedor.fadeIn();
                            });
                        } else {
                            lstControles.dvContenedor.fadeOut(function () {
                                $.each(colControlEdicion, function (cl, control) {
                                    control.control.fadeIn();
                                })
                                lstControles.dvTabla.fadeIn();
                            });
                        };

                        if ($.isFunction(lstControles.fnLimpiarInformacion)) {
                            lstControles.fnLimpiarInformacion();
                        };
                        IdEdicion = undefined;
                        $.each(colControles, function (ct, ctrl) {
                            if (ctrl.control !== undefined) {
                                if ($.isFunction(ctrl.control.limpiar)) {
                                    ctrl.control.limpiar();
                                } else if (ctrl.tipoDato === 'bit') {
                                    ctrl.control.value(false);
                                };
                            };
                        });
                        coleccionServicioRelacionado = []; //Limpio las relaciones de la entidad.
                    }

                    //Funcion temporal que se usurá con la vista usuario
                    var fnAccion = undefined;
                    if (colVista[0].ServicioRelacionado.length > 0 && lstControles.filtros === undefined) {
                        fnAccion = function (objAccion) {
                            objAccion = ObjetoKendo(objAccion);
                            var atributos = {
                                vista: colVista[0],
                                titulo: "Asignaciones",
                                ancho: "95%",
                                alto: "95%",
                                vistaPadre: objAccion,
                                blnCargaData: objAccion.blnCargaData
                            };
                            thisJs.ModalRelacion(atributos);
                        };
                    };

                    $.each(colVista, function (vs, vista) {
                        var blnPintaControl = (Enumerable.From(vista.ServicioCampoes).Where('x => x.ServicioTipoCampoId ===' + thisJs.ServicioEnum.ServicioTipoCampo_MultiLista).Count() <= 0)

                        $.each(vista.ServicioCampoes, function (ct, control) {
                            if (control.ServicioCampoDescripcion.toLowerCase() !== 'id') {
                                var tipoControl = undefined;
                                var dvPrincipal = $("<div class='col-xs-12 col-sm-6 col-lg-4'></div"),
                                dvLabel = $("<div class='col-xs-5'></div>"),
                                spanControl = $("<span>" + control.ServicioCampoDescripcion + "</span>"),
                                dvControl = $("<div class='col-xs-7'></div>"),
                                oblColumna = {},
                                ctrControl = undefined;

                                dvLabel.append(spanControl);

                                if (control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Lista) {
                                    if (blnPintaControl === true) {
                                        ctrControl = $("<div  id='" + control.Id + "' ></div>");
                                        dvControl.append(ctrControl);
                                        dvPrincipal.append(dvLabel).append(dvControl);
                                        lstControles.dvContenedor.append(dvPrincipal);

                                        ctrControl = thisJs.CtrComboFiltro(ctrControl, {
                                            datos: [],
                                            strAyuda: control.ServicioCampoAyuda,
                                            display: control.ServicioCampoServicioRelacionadoDisplay,
                                            value: 'Id',
                                            blnEditar: control.ServicioCampoVisibleModificar,
                                            blnObligatorio: control.ServicioCampoRequerido,
                                            strNombre: control.ServicioCampoDescripcion
                                        })
                                    };
                                    oblColumna = {
                                        field: control.ServicioCampoNombre,
                                        title: control.ServicioCampoDescripcion,
                                        tipo: 'number',
                                        filterable: {
                                            cell: {
                                                operator: "gte"
                                            }
                                        },
                                        width: '200px',
                                    };

                                    tipoControl = 'Lista';
                                }
                                else {

                                    if (control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_MultiLista) {
                                        ctrControl = $("<div></div>");
                                        dvControl.append(ctrControl);
                                        dvPrincipal.append(dvLabel, dvControl);
                                        lstControles.dvContenedor.append(dvPrincipal);
                                        control.ServicioCampoTipoDato = 'MultiSelect'

                                        var fnSeleccionaregistros = function (data) {
                                            ctrControl.Actualizadata(data, true);
                                        };

                                        thisJs.CtrMultipleCheck(ctrControl, {
                                            strAyuda: control.ServicioCampoAyuda,
                                            display: control.ServicioCampoServicioRelacionadoDisplay,
                                            value: 'Id',
                                            strNombre: control.ServicioCampoNombre,
                                            blnEditar: control.ServicioCampoVisibleModificar,
                                            blnObligatorio: control.ServicioCampoRequerido,
                                            autoClose: false,
                                            fnbtnBusqueda: function () {
                                                thisJs.ModalCrud({
                                                    IdVista: control.ServicioCampoRelacionadoId,
                                                    titulo: control.ServicioCampoNombre,
                                                    blnMuestraCheck: true,
                                                    fnTerminaSeleccion: fnSeleccionaregistros
                                                })
                                            },
                                            datos: []
                                        });

                                        tipoControl = 'MultiSelect';
                                    }
                                    else {
                                        if (control.ServicioTipoCampoId === thisJs.ServicioEnum.ServicioTipoCampo_Busqueda) {
                                            ctrControl = $("<div></div>");
                                            dvControl.append(ctrControl);
                                            dvPrincipal.append(dvLabel, dvControl);
                                            lstControles.dvContenedor.append(dvPrincipal);
                                            control.ServicioCampoTipoDato = 'MultiSelect';

                                            oblColumna = {
                                                field: control.ServicioCampoNombre,
                                                title: control.ServicioCampoDescripcion,
                                                tipo: 'number',
                                                filterable: {
                                                    cell: {
                                                        operator: "gte"
                                                    }
                                                },
                                                width: '200px',
                                            };

                                            var fnSeleccionaregistros = function (data) {
                                                ctrControl.Actualizadata(data, true);
                                            };

                                            thisJs.CtrMultipleFind(ctrControl, {
                                                strAyuda: control.ServicioCampoAyuda,
                                                display: control.ServicioCampoServicioRelacionadoDisplay,
                                                value: 'Id',
                                                strNombre: control.ServicioCampoNombre,
                                                blnEditar: control.ServicioCampoVisibleModificar,
                                                blnObligatorio: control.ServicioCampoRequerido,
                                                fnbtnBusqueda: function () {
                                                    thisJs.ModalFind({
                                                        IdVista: control.ServicioCampoRelacionadoId,
                                                        titulo: control.ServicioCampoNombre,
                                                        blnMuestraCheck: true,
                                                        fnTerminaSeleccion: fnSeleccionaregistros
                                                    })
                                                },
                                                datos: []
                                            });

                                            tipoControl = 'MultiSelect';
                                        }
                                        else {

                                            tipoControl = 'Simple';
                                            switch (control.ServicioCampoTipoDato) {
                                                case "varchar":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        thisJs.CtrlTextbox(ctrControl, {
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strNombre: control.ServicioCampoDescripcion,
                                                            intLongitud: control.ServicioCampoPrecision,
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            strTipo: control.ServicioCampoExprRegular
                                                        })
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        width: '200px',
                                                    };
                                                    break;
                                                case "xml":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        thisJs.CtrlTextbox(ctrControl, {
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strNombre: control.ServicioCampoDescripcion,
                                                            intLongitud: control.ServicioCampoPrecision,
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            strTipo: control.ServicioCampoExprRegular
                                                        })
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        width: '200px',
                                                    };
                                                    break;
                                                case "nvarchar":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        thisJs.CtrlTextbox(ctrControl, {
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strNombre: control.ServicioCampoDescripcion,
                                                            intLongitud: control.ServicioCampoPrecision,
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            strTipo: control.ServicioCampoExprRegular
                                                        })
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        width: '200px',
                                                    };
                                                    break;
                                                case "password":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input type='password' id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        thisJs.CtrlTextbox(ctrControl, {
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strNombre: control.ServicioCampoDescripcion,
                                                            intLongitud: control.ServicioCampoPrecision,
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            strTipo: control.ServicioCampoExprRegular
                                                        })
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        width: '200px',
                                                    };
                                                    break;
                                                case "datetime":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        thisJs.CtrFecha(ctrControl, {
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            strNombre: control.ServicioCampoDescripcion
                                                        });
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        type: "date",
                                                        format: "{0:dd-MM-yyyy}",
                                                        width: '200px',
                                                        strFormato: {
                                                            Fecha: 'L'
                                                        }
                                                    };
                                                    break;
                                                case "bit":
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $('<div id="' + control.Id + '"></div>');
                                                        thisJs.CtrCheck(ctrControl, {});
                                                        dvControl.append(ctrControl);
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        filterable: {
                                                            cell: {
                                                                operator: "contains"
                                                            }
                                                        },
                                                        width: '200px',
                                                        template: '#= ' + control.ServicioCampoNombre + ' ? "Si" : "No"#'
                                                    };
                                                    break;
                                                default:  //smallint-int-bigint-float-numeric
                                                    if (blnPintaControl === true) {
                                                        ctrControl = $("<input id='" + control.Id + "'/>");
                                                        dvControl.append(ctrControl);
                                                        var intDecimal = 0,
                                                        intMaximo = 0

                                                        if (control.ServicioCampoTipoDato === 'float' || control.ServicioCampoTipoDato === 'numeric') {
                                                            intDecimal = control.ServicioCampoEscala;
                                                            intMaximo = Array((control.ServicioCampoPrecision + 1) - intDecimal).join(9);
                                                        } else {
                                                            intMaximo = Array(control.ServicioCampoPrecision + 1).join(9);
                                                        }

                                                        thisJs.CtrNumeric(ctrControl, {
                                                            strAyuda: control.ServicioCampoAyuda,
                                                            numMaximo: intMaximo,
                                                            intDecimales: intDecimal,
                                                            intIncremento: 0,
                                                            numMinimo: 0,
                                                            blnEditar: control.ServicioCampoVisibleModificar,
                                                            blnObligatorio: control.ServicioCampoRequerido,
                                                            strNombre: control.ServicioCampoDescripcion
                                                        })
                                                    };
                                                    oblColumna = {
                                                        field: control.ServicioCampoNombre,
                                                        title: control.ServicioCampoDescripcion,
                                                        width: '200px',
                                                        type: "number",
                                                        filterable: {
                                                            cell: {
                                                                operator: "gte"
                                                            }
                                                        }
                                                    };
                                                    break;

                                            }
                                        }
                                    }
                                    if (blnPintaControl === true) {
                                        dvPrincipal.append(dvLabel).append(dvControl);
                                        lstControles.dvContenedor.append(dvPrincipal);
                                    };
                                }

                                colControles.push({
                                    id: control.ServicioCampoRelacionadoId,
                                    campo: control.ServicioCampoNombre,
                                    tipoDato: control.ServicioCampoTipoDato,
                                    tipoCampo: control.ServicioTipoCampoId,
                                    control: ctrControl,
                                    tipoControl: tipoControl,
                                    vista: control.ServicioId,
                                    servicio: control.ServicioNombre,
                                    CampoRelacionado: control.ServicioCampoNombre,
                                    display: control.ServicioCampoServicioRelacionadoDisplay,
                                    TipoServicio: control.TipoServicioId,
                                    ServicioCampoRelacionadoId: control.ServicioCampoRelacionadoId
                                });

                                if (control.ServicioCampoVisibleModificar === false) {
                                    colControlEdicion.push({ control: dvPrincipal })
                                }

                                if (control.ServicioCampoVisibleAdicionar === false) {
                                    colControlAdicion.push({ control: dvPrincipal })
                                }

                                if (control.ServicioCampoVisibleGrilla === true) {
                                    columnaGrilla.push(oblColumna);
                                }

                            } else if (control.ServicioCampoDescripcion.toLowerCase() === 'id') {
                                columnaGrilla.push({
                                    field: 'Id',
                                    title: control.ServicioCampoDescripcion,
                                    blnIdentificador: true,
                                    hidden: true,
                                    filtra: false
                                });
                            };
                        });

                        if (blnPintaControl === false) {
                            fnActualizaRegistro = undefined;
                            if (lstControles.filtros !== undefined) {
                                thisJs.EntidadRelacionada({
                                    idServicioPadre: lstControles.filtros.ServicioCampoRelacionadoId,
                                    identificadorPadre: lstControles.filtros.idBusqueda,
                                    vista: vista,
                                    contenedor: lstControles.dvContenedor,
                                    grillaPadre: tblDatos,
                                    registroPadre: lstControles.registroPadre,
                                    fnCancelar: fnLimpia
                                });
                            };
                        };

                        if (vista.ServicioRelacionado.length > 0 && lstControles.filtros === undefined) {
                            var dvButtonAsignacion = $('<div class="col-xs-12 col-sm-6 col-lg-4"></div>'),
                                btnAsignacion = $('<button class="k-primary k-button">Asignación</button>');

                            dvButtonAsignacion.append($('<div class = "col-xs-12"></div>').append(btnAsignacion));
                            colControles.push({
                                id: undefined,
                                campo: 'BotonAsignacion',
                                tipoDato: undefined,
                                tipoCampo: undefined,
                                control: btnAsignacion
                            });

                            lstControles.dvContenedor.append(dvButtonAsignacion);

                            btnAsignacion.bind('click', function () {
                                fnAccion({
                                    blnCargaData: false,
                                    Id: IdEdicion
                                });
                            });
                        };
                    });

                    thisJs.CtrTabla(tblDatos, {
                        fnAgregaRegistro: function () {
                            fnLimpia(true);

                            $.each(colControlEdicion, function (cl, control) {
                                control.control.fadeIn();
                            });

                            $.each(colControlAdicion, function (cl, control) {
                                control.control.fadeOut();
                            });

                        },//Indica la función que se ejecuta para agregar un nuevo registro, si no se envía nada no se agrega el botón de nuevo
                        fnDobleClickFila: function () { },//
                        fnElimina: lstControles.fnEliminaRegistro,
                        fnActualiza: fnActualizaRegistro,
                        fnAcciones: fnAccion,
                        blnChecks: lstControles.blnMuestraCheck,
                        exportar: true, // Indica si se agrega o no el botón de exportar
                        data: [],//información que se mostrará en la grilla
                        columnas: columnaGrilla
                    })

                    colControles.push({
                        id: 'dvTablaInfo',
                        control: tblDatos
                    });

                    //Se asigna elvalor de la tabla y la lista de columnas en servicio
                    if (lstControles.blnInformacionServicioCrud === true) {
                        objInformacionServicioCrud = {
                            tabla: tblDatos,
                            objServicio: colVista
                        };
                    };

                    var dvButtons = $('<div class="col-xs-12" ></div>'),
                    dvButton2 = $('<div class="col-xs-12"></div>'),
                    btnCancelar = $('<button class="k-primary k-button pull-right">Cancelar</button>'),
                    btnGuardar = $('<button class="k-primary k-button pull-right">Guardar</button>');

                    dvButtons.append(dvButton2.append(btnCancelar).append(btnGuardar));
                    lstControles.dvContenedor.append(dvButtons);

                    btnGuardar.bind('click', function () {
                        var blnGuarda = true,
                        objGuardar = {};
                        $.each(colControles, function (ct, ctrl) {
                            if (ctrl.campo === "BotonAsignacion") {
                                for (var propertyName in coleccionServicioRelacionado) {
                                    objGuardar[propertyName] = coleccionServicioRelacionado[propertyName];
                                };
                            } else if (ctrl.tipoCampo !== undefined) {
                                if ($.isFunction(ctrl.control.obligatorio)) {
                                    var blnTmp = false;
                                    blnTmp = ctrl.control.obligatorio();
                                    if (blnTmp === false) {
                                        blnGuarda = false;
                                    }
                                }
                                if (ctrl.tipoControl === 'MultiSelect' || ctrl.tipoDato === 'Busqueda') {
                                    objGuardar[ctrl.CampoRelacionado] = ctrl.control.value();
                                }
                                else {
                                    objGuardar[ctrl.campo] = ctrl.control.value();
                                }
                            }
                        })
                        if (blnGuarda === true) {
                            if ($.isFunction(lstControles.fnGuardaInformacion)) {
                                if (IdEdicion !== undefined && $.isNumeric(IdEdicion)) {
                                    objGuardar.Id = IdEdicion;
                                }
                                lstControles.fnGuardaInformacion(objGuardar);
                            };
                        }
                    });
                    btnCancelar.bind('click', function () {
                        fnLimpia(false);
                    });

                    colControles.push(
                    { id: 'btnGuardar', control: btnGuardar },
                    { id: 'btnCancelar', control: btnCancelar });

                    thisJs.CierraModales();
                    if ($.isFunction(lstControles.fnTerminaControles)) {
                        lstControles.fnTerminaControles(colControles, strVistas);
                    };
                } else {
                    thisJs.CierraModales();
                    thisJs.ModalMensaje({
                        Mensaje: 'No se han creado los registros de este menú en servicio campo, por favor comuníquese con el administrador del sistema y solicite la creación de estos registros.',
                        Titulo: 'Crear registro en servicioCampo'
                    });
                };
            };
        },
        function (ex) {
            thisJs.CierraModales();
            thisJs.ModalMensaje({
                Mensaje: ex.responseText,
                Titulo: 'Consulta fallida'
            });
        },
        '/Generico/IniciaFormulario')
    };

    /// <summary>
    /// <Descripción>Crea los controles y grillas de una vista seleccionada en el menú</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.PintaMenuSeleccionado = function (atributos) {
        //atributos = {
        //  menu: 'Usuario',//menu seleccionado
        //  vista: 37,//Indica el id de la vista,
        //  tblGrillaDatos:$("<div></div>"),// Div para crear la tabla con la información
        //  ContenPage:$("<div></div>")// Div para adicionar los controles
        //  idServicioPadre: 5, //Indica si viene desde unaasignación
        //  Filtro: { //En caso de ser seleccionado desde un padre, 
        //   idBusqueda: 8,// El id de la fila seleccionada
        //   ServicioCampoRelacionadoId: 38, Vista relacionada
        //  },
        //  fnGuardaInformacion: function (objGuardar, vista) { }, // Función que se ejecutará despues de validar todos los campos, retornando el objeto a guardar, según los controles del formulario y el identificador de la vista 
        //  fnLimpiarInformacion: function (objGuardar, vista) { }, // Función que se ejecutará despues limpiar todos los campos;
        //  blnMuestraCheck: true //Indica si se muestra la columna de checkbox
        //  blnInformacionServicioCrud: true // Indica si asigna la tabla  y las columnas creadas al objInformacionServicioCrud
        //}

        var ttlPagina = $("#ttlPagina"),
        idVistaTrabajada = 0,
        ColDataGrilla = [],
        ColControles = [],
        btnGuarda,
        btnCancela,
        grGrilladatos,
        objFiltro = {};


        //Esta función se ejecutará una vez se haya finalizado la pintada de los controles Se usa para cargar los datos de las listas paramétricas y los datos de la grilla
        var fnFinPintarControl = function (colControl, vista) {
            ColControles = colControl;
            var ctrListas = Enumerable.From(ColControles).Where(function (ctrl) { return ctrl.tipoCampo === thisJs.ServicioEnum.ServicioTipoCampo_Lista }).ToArray();
            grGrilladatos = Enumerable.From(ColControles).Where(function (ctrl) { return ctrl.id === ('dvTablaInfo') }).FirstOrDefault();
            btnGuarda = Enumerable.From(ColControles).Where(function (ctrl) { return ctrl.id === ('btnGuardar') }).FirstOrDefault();
            btnCancela = Enumerable.From(ColControles).Where(function (ctrl) { return ctrl.id === ('btnCancelar') }).FirstOrDefault();
            if (atributos.blnCargaData !== false || atributos.Filtro !== undefined) {

                if (atributos.Filtro !== undefined) {
                    var objServicioCampo = Enumerable.From(ColControles).Where(function (d) { return d.id === atributos.Filtro.ServicioCampoRelacionadoId }).FirstOrDefault();
                    if (objServicioCampo !== undefined) {
                        objFiltro[objServicioCampo.campo] = atributos.Filtro.idBusqueda;
                        ColControles = Enumerable.From(ColControles).Where(function (d) { return d.id !== atributos.Filtro.ServicioCampoRelacionadoId }).ToArray(); //Elimina el control del formulario
                        if (objServicioCampo.control !== undefined) {
                            objServicioCampo.control.parent().closest('.col-xs-12').fadeOut();
                        };
                    };
                } else {
                    objFiltro = undefined;
                };

                thisJs.ModalEspera('Consultando registros')
                thisJs.EjecutarAjax('', { idVista: vista, filtros: JSON.stringify(objFiltro === undefined ? '' : objFiltro), objBusqueda: '' },
                function (okData) {
                    /*Se comprueba que el objeto de retorno este correcto.*/
                    try {
                        okData = JSON.parse(okData);
                    }
                    catch (ex) {
                        okData.OperacionExitosa = false;
                        okData.Mensaje = okData.Vistas;
                    }

                    if (okData.OperacionExitosa === true && okData.ValidacionesNegocio === false) {
                        ColDataGrilla = okData.Vistas;
                        grGrilladatos.control.Actualizadata(ColDataGrilla);
                        if (ctrListas.length > 0) {
                            $.each(ctrListas, function (lst, lista) {
                                var blnUltimo = ((ctrListas.length - 1) === lst);
                                fnLlenaListaParametrico(lista, blnUltimo)
                            })
                        } else {
                            thisJs.CierraModales();
                        }
                        idVistaTrabajada = vista
                    } else {
                        atributos.ContenPage.empty();
                        thisJs.CierraModales();
                        atributos.tblGrillaDatos.empty();

                        if (okData.OperacionExitosa === true && okData.ValidacionesNegocio === true) {
                            thisJs.CierraModales();
                            thisJs.Mensajeria(okGuarde.Mensaje, 'warning', 'Validaciones ' + operacion);
                        } else {
                            if (okData.OperacionExitosa === false && okData.ValidacionesNegocio === false) {
                                location.replace('error.html?strError=' + okData.Mensaje);
                            }
                        }
                    }
                },
                function (ex) {
                    thisJs.CierraModales();
                },
                '/Generico/ConsultaDatos'
                );
            };
        };

        //funciona para llenar los campos de tipo lista.
        var fnLlenaListaParametrico = function (lista, blnCierraModal) {
            if (lista.ServicioCampoRelacionadoId !== '' && lista.TipoServicio !== thisJs.ServicioEnum.TipoServicio_Transaccional) {
                if (lista.control !== undefined) {
                    thisJs.EjecutarAjax('', { idVista: lista.id, filtros: '', objBusqueda: '' },
                    function (okData) {
                        if (okData !== "") {
                            okData = JSON.parse(okData);
                            var colData = okData.Vistas;
                            lista.control.Actualizadata(colData);
                            if (blnCierraModal === true) {
                                thisJs.CierraModales();
                            };
                        }
                    },
                    function (ex) {
                        alert(ex)
                    },
                    '/Generico/ConsultaDatos'
                    );
                } else if (blnCierraModal === true) {
                    thisJs.CierraModales();
                };;
            } else {
                lista.control.fnBusca(true, lista);
                lista.control.Actualizadata([{ Id: 0 }]);
                if (blnCierraModal === true) {
                    thisJs.CierraModales();
                }
            }
        }

        //Función para guardar un registro en la base de datos, el cual recibe la entidad a guardar
        var fnGuardaInformacion = function (objGuardar) {
            var funcion = 'GuardaRegistro',
            operacion = 'guardado',
            tipo = 0;

            if (objGuardar.Id !== undefined && $.isNumeric(objGuardar.Id) && parseInt(objGuardar.Id) > 0) {
                funcion = 'ActualizaRegistro';
                operacion = 'actualizado';
                tipo = 1;
            }

            //Si se va a guardar desde un IdPadre, se iguala el valor en el objeto a guardar
            if (objFiltro !== undefined) {
                for (var propertyName in objFiltro) {
                    objGuardar[propertyName] = objFiltro[propertyName];
                }
            }

            thisJs.ModalEspera('Un momento por favor...');
            thisJs.EjecutarAjax(funcion, {
                idVista: idVistaTrabajada,
                objGuarde: JSON.stringify(objGuardar)
            },
            function (okGuarde) {
                thisJs.CierraModales();
                okGuarde = JSON.parse(okGuarde);

                /*Se comprueba la ejecución del servicio*/
                if (okGuarde.OperacionExitosa === true && okGuarde.ValidacionesNegocio === false) {
                    try {
                        objGuardar = okGuarde.Vista;
                    }
                    catch (ex) {
                        okGuarde.OperacionExitosa = false;
                        okGuarde.Mensaje = okGuarde.Mensaje;
                    }
                };

                if (okGuarde.OperacionExitosa === true && okGuarde.ValidacionesNegocio === false) {
                    if (tipo === 0) {
                        ColDataGrilla.push(objGuardar);
                    } else if (tipo === 1) {
                        $.each(ColDataGrilla, function (i, obj) {
                            if (obj.Id === objGuardar.Id) {
                                for (var propertyName in objGuardar) {
                                    ColDataGrilla[i][propertyName] = objGuardar[propertyName]
                                }
                                return false;
                            }
                        })
                    };

                    grGrilladatos.control.Actualizadata(ColDataGrilla);
                    bootbox.dialog({
                        message: 'Se ha ' + operacion + ' el registro correctamente con el identificador: ' + objGuardar.Id,
                        title: "Registro " + operacion,
                        buttons: {
                            success: {
                                label: "Ok",
                                className: "green",
                                callback: function () {
                                    btnCancela.control.click();
                                }
                            }
                        }
                    });
                } else {

                    if (okGuarde.OperacionExitosa === true && okGuarde.ValidacionesNegocio === true) {
                        thisJs.CierraModales();
                        thisJs.Mensajeria(okGuarde.Mensaje, 'warning', 'Validaciones ' + operacion);
                    } else {
                        if (okGuarde.OperacionExitosa === false && okGuarde.ValidacionesNegocio === false) {
                            location.replace('error.html?strError=' + okGuarde.Mensaje);
                        }
                    }
                }


            },
            function (badGuarde) {
                thisJs.CierraModales();
                thisJs.ModalMensaje({
                    Mensaje: badGuarde.responseText,
                    Titulo: 'Consulta fallida'
                });
            },
            '/Generico/' + funcion)
        };

        //Función para eliminar un registro en la base de datos, el cual recibe la entidad a guardar
        var fnEliminaRegistro = function (objElimina) {
            var fnConfirmacion = function () {
                if (objElimina.Id === undefined) {
                    var colDataFiltrada = [];//Enumerable.From(grGrilladatos.control.data('kendoGrid')._data).Where('x => x.uid !=="' + objElimina.uid + '"').ToArray();
                    $.each(grGrilladatos.control.data('kendoGrid')._data, function (i, dato) {
                        if (dato.uid !== objElimina.uid) {
                            colDataFiltrada.push(ObjetoKendo(dato));
                        };
                    });
                    grGrilladatos.control.Actualizadata(colDataFiltrada);
                } else {
                    thisJs.ModalEspera('Eliminando...');
                    thisJs.EjecutarAjax('', {
                        idVista: idVistaTrabajada,
                        idEliminar: objElimina.Id
                    },
                    function (okElimina) {
                        thisJs.CierraModales();
                        okElimina = JSON.parse(okElimina)

                        /*Se comprueba la ejecución del servicio*/
                        if (okElimina.OperacionExitosa === true && okElimina.ValidacionesNegocio === false) {
                            $.each(ColDataGrilla, function (i, obj) {
                                if (obj.Id === objElimina.Id) {
                                    ColDataGrilla.splice(i, 1)
                                    grGrilladatos.control.Actualizadata(ColDataGrilla);
                                    return false;
                                }
                            });
                            bootbox.dialog({
                                message: 'Se ha eliminado el registro correctamente',
                                title: "Registro Eliminado",
                                buttons: {
                                    success: {
                                        label: "Ok",
                                        className: "green",
                                        callback: function () {
                                            btnCancela.control.click();
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            if (okElimina.OperacionExitosa === true && okElimina.ValidacionesNegocio === true) {
                                thisJs.Mensajeria(okElimina.Mensaje, 'danger', 'Validaciones');
                            } else {
                                if (okElimina.OperacionExitosa === false && okElimina.ValidacionesNegocio === false) {
                                    location.replace('error.html?strError=' + okElimina.Mensaje);
                                }
                            }
                        }
                    },
                    function (badGuarde) {
                        thisJs.CierraModales();
                        alert(badGuarde);
                    },
                    '/Generico/EliminaRegistro')
                };
            };
            bootbox.dialog({
                message: '¿Esta seguro de eliminar el registro?',
                title: "Eliminar registro",
                buttons: {
                    success: {
                        label: "Si",
                        className: "green",
                        callback: function () {
                            fnConfirmacion();
                        }
                    },
                    main: {
                        label: "No",
                        className: "btn-primary"
                    }
                }
            });
        };

        if ($.isFunction(atributos.fnGuardaInformacion)) {
            fnGuardaInformacion = atributos.fnGuardaInformacion;
        }

        //Pinta los controles del menu seleccionado
        var fnInicioFormulario = function () {
            var idVistaBusqueda = (atributos.menu === undefined ? atributos.vista : atributos.menu.ServicioId);
            thisJs.PintaControles({
                dvContenedor: atributos.ContenPage,
                dvTabla: atributos.tblGrillaDatos,
                filtros: atributos.Filtro,
                fnTerminaControles: fnFinPintarControl,
                fnGuardaInformacion: fnGuardaInformacion,
                fnEliminaRegistro: fnEliminaRegistro,
                fnLimpiarInformacion: atributos.fnLimpiarInformacion,
                registroPadre: atributos.registroPadre,
                blnMuestraCheck: atributos.blnMuestraCheck,
                blnInformacionServicioCrud: atributos.blnInformacionServicioCrud
            }, idVistaBusqueda);
        };

        //Limpia los datos del contenedor
        var fnLimpiaContenedor = function () {
            atributos.ContenPage.fadeOut(function () {
                atributos.tblGrillaDatos.empty();
                atributos.ContenPage.empty();
                atributos.tblGrillaDatos.fadeIn();
            })
        };

        //Llena la información en la página
        var fnContenidoPagina = function () {
            if (atributos.menu !== undefined && atributos.menu.MenuNombre !== undefined) {
                ttlPagina.text(atributos.menu.MenuNombre);
            }
        };

        fnContenidoPagina();
        fnLimpiaContenedor();
        fnInicioFormulario();
    }

    /// <summary>
    /// <Descripción>Pinta en tabs los</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.ModalRelacion = function (atributos) {
        //atributos: { 
        //vista : vista, //vista que contiene las relaciones
        //ancho:, //Ancho de la modal
        //alto:, // Alto de la modal
        //titulo:, // Titulo de la modal
        //vistaPadre: vistaPadre,// objeto seleccionado desde la grilla
        //fnGuardar:function(){}// función que se ejecuta al momento de guardar
        //fnAbrir: function(){},Función que se ejecuta al momento de abrir la modal
        //fnCerrar: function(){}, Función que se ejecuta al momento de cerrar la modal
        //fnActivar: function(){} Función que se ejecuta al momento que la modal está activa
        //}

        var tabStrip = $('<div></div>'),
        dvPestana = $('<ul></ul>'),
        colVistaMenu = [];

        var fnPintaTab = function (objVista) {
            var ctrVista = $('<li>' + objVista.ServicioNombre + '</li>'),
                dvPagina = $('<div></div>'),
                dvControl = $('<div style="display: none; height:' + atributos.alto + '"></div>'),
                dvGrilla = $('<div id = "dtl-' + atributos.Id + '"></div>'),
                blnCreado = false,
                objControles = {},
                objFiltro = {
                    idBusqueda: atributos.vistaPadre.Id,
                    ServicioCampoRelacionadoId: atributos.vista.Id
                };

            dvPestana.append(ctrVista);
            tabStrip.append(dvPagina);
            dvPagina.append(dvControl, dvGrilla);

            ctrVista.bind('click', function () {
                if (blnCreado === false) {
                    objControles = thisJs.PintaMenuSeleccionado({
                        vista: objVista.Id,
                        tblGrillaDatos: dvGrilla,
                        ContenPage: dvControl,
                        Filtro: objFiltro,
                        idServicioPadre: atributos.vista.Id,
                        registroPadre: atributos.vistaPadre,
                        blnCargaData: atributos.blnCargaData
                    });
                    blnCreado = true;
                };
            })
        }

        tabStrip.prepend(dvPestana);

        thisJs.ModalVacia({
            ancho: atributos.ancho,
            alto: atributos.alto,
            titulo: atributos.titulo,
            contenido: tabStrip,
            fnCerrar: function (e) {
                if (atributos.vistaPadre.Id === undefined) {
                    coleccionServicioRelacionado = atributos.vistaPadre;
                };
                e.sender.element.empty();
            }
        });

        $.each(atributos.vista.ServicioRelacionado, function (i, vista) {
            fnPintaTab(vista);
        })
        tabStrip.kendoTabStrip();
    }

    /// <summary>
    /// <Descripción>Crea los controles y grillas de una vista seleccionada en la asignación</Descripción>
    /// <parametros>
    /// <nombre>atributos</nombre> <Detalle> revisar al interior de la función</Detalle>
    /// </parametros>
    /// </summary>
    this.EntidadRelacionada = function (atributos) {
        var objPrimerMultilista = Enumerable.From(atributos.vista.ServicioCampoes).Where('x => x.ServicioCampoRelacionadoId !== ' + atributos.idServicioPadre + ' && x.ServicioTipoCampoId === ' + thisJs.ServicioEnum.ServicioTipoCampo_MultiLista).FirstOrDefault(),
            tblDatos = $('<div id="tblSub-' + objPrimerMultilista.ServicioCampoRelacionadoId + '"></div>'),
            colControlDetail = [],
            colServicioCampoPintar = Enumerable.From(atributos.vista.ServicioCampoes).Where('x => x.ServicioCampoVisible === true && x.ServicioCampoRelacionadoId !== ' + atributos.idServicioPadre + ' && x.ServicioCampoRelacionadoId !== ' + objPrimerMultilista.ServicioCampoRelacionadoId + ' && x.ServicioTipoCampoId !== ' + thisJs.ServicioEnum.ServicioTipoCampo_MultiLista).ToArray(), //Controles a pintar en caso de dar click en el detalle de la grilla
            colServicioCampoMultiple = Enumerable.From(atributos.vista.ServicioCampoes).Where('x => x.ServicioCampoVisible === true && x.ServicioCampoRelacionadoId !== ' + atributos.idServicioPadre + ' && x.ServicioCampoRelacionadoId !== ' + objPrimerMultilista.ServicioCampoRelacionadoId + ' && x.ServicioTipoCampoId === ' + thisJs.ServicioEnum.ServicioTipoCampo_MultiLista).ToArray(), //Las grillas heredadas a pintar en el control
            strNombreRelacion = atributos.vista.ServicioNombre + 's'; //Nombre de la propiedad relacionada más la letra 's'

        if (atributos.registroPadre[strNombreRelacion] === undefined || atributos.registroPadre[strNombreRelacion] === null) {
            atributos.registroPadre[strNombreRelacion] = [];
        };

        var fnGuardeExitoso = function (okGuarde) {
            okGuarde = JSON.parse(okGuarde);
            if (okGuarde.Resultado === true) {
                objActualizado = JSON.parse(okGuarde.Vistas);
                atributos.grillaPadre.Actualizadata(objActualizado[strNombreRelacion]);
                thisJs.CierraModales();
                thisJs.ModalMensaje({
                    Mensaje: 'Se ha realizado la asignación de los registros correctamente.',
                    Titulo: 'Asignación correcta.',
                    fnAceptar: fnCancelaMultilista
                });
            } else {
                location.replace('error.html');
            };
        };
        var fnGuardaMultilista = function () {
            thisJs.ModalEspera('Asignando registros.');
            thisJs.EjecutarAjax('', { idVista: atributos.idServicioPadre, objGuarde: JSON.stringify(atributos.registroPadre) }, fnGuardeExitoso, fnConsultaBad, '/Generico/ActualizaRegistro');
        };
        var fnArmaMultilista = function () {
            /*Se recomienda ejecutar Menu\Seguridad\Rol\Columna Asignación\RolOperacionAccion para entender mejor esta función*/
            if (tblDatos.Seleccion.length > 0) {
                var colSeleccionados = [], // lista de las filas expandidas en las grillas y los controles en su último nivel
                  colGuarda = [],
                  df = Enumerable.From(colControlDetail).OrderBy('x => x.padres.length').ToArray();

                /*Se encarga de crear los registros que se seleccionaron, luego se agregan a la colección colGuarda*/
                var fnRecursive = function (objeto) {
                    /*Validación que el control adicionado sea de tipo grilla, por lo cual se valida que la propiedad  "Seleccion" sea un Array*/
                    if ($.isArray(objeto.objSeleccion.control.Seleccion)) {
                        /*Se obtiene el nombre de la propiedad a la cual pertenece la grilla*/
                        var objServicioCampoRelacion = Enumerable.From(atributos.vista.ServicioCampoes).Where('x => x.ServicioCampoRelacionadoId === ' + objeto.objSeleccion.idServicio).FirstOrDefault();
                        /*Se recorren todos los registros seleccionados de la subgrilla para validar cuales fueron escogidas*/
                        $.each(objeto.objSeleccion.control.Seleccion, function (i, hijo) {
                            /*Creación de la propiedad de la cual hace parte la grilla en el objeto objeto.objGuarde,
                            y asignación a esa propiedad del valor Id del registro seleccionado 
                            recordemos que esta entidad  que se adicionará a colGuarda es la coleccion general a guardar*/
                            objeto.objGuarde[objServicioCampoRelacion.ServicioCampoNombre] = hijo.Id;
                            /*Consulta de las hijas que tenga el control*/
                            var objHijo = Enumerable.From(objeto.objSeleccion.Hijo).Where('x => $.isArray(x.Hijo) && x.idRelacionado === ' + hijo.Id).FirstOrDefault();
                            if (objHijo !== undefined) {
                                fnRecursive({
                                    objSeleccion: objHijo,
                                    objGuarde: objeto.objGuarde,
                                    index: i,
                                    total: objeto.objSeleccion.Hijo.length
                                })
                            } else {
                                /**/
                                var colHijo = Enumerable.From(objeto.objSeleccion.Hijo).Where('x => x.idRelacionado === ' + hijo.Id).ToArray();
                                if (colHijo.length > 0) {
                                    var objFinalGuardar = ObjetoKendo(objeto.objGuarde);
                                    $.each(colHijo, function (j, control) {
                                        objFinalGuardar[control.control.campo] = control.control.control.value();
                                    });
                                    colGuarda.push(objFinalGuardar);
                                };
                            };
                        });
                    };
                };

                /*Recorrida de todas las filas que fueron expandidas en el primer nivel, es decir la primera grilla (entidad relacionada)*/
                $.each(df, function (i, opcion) {
                    if ($.isArray(opcion.control.Seleccion)) {
                        /*Se valida que el elemento a validar sea una grilla, para agregarle el IdControl y un array de los hijos*/
                        opcion.IdControl = opcion.control[0].id;
                        opcion.Hijo = [];
                    };
                    if (opcion.padres.length === 1) {
                        /*En la lista de colSelecionados, se agrega la fila seleccionada, esta es de la primera grilla*/
                        colSeleccionados.push(opcion);
                    } else {
                        /*Ordeno los padres del registro por longitud del Id, el Id está conformado por el Id de la(s) grilla(s) padre(s) más el id de la grilla actual.
                        El objPapa, es igualado a la colección colSeleccionados, con el fin de cargar todos los controles que esten cargados en ella y hacer este control recursivo*/
                        var objPapa = colSeleccionados;
                        opcion.padres = Enumerable.From(opcion.padres).OrderBy('x => x.id.split("-".length)').ToArray();

                        $.each(opcion.padres, function (j, papa) {
                            /*Se recorre cada uno de los padres, validando que el id no se igual a la primera grilla*/
                            if (tblDatos[0].id !== papa.id) {
                                /*Busqueda del control en el objPapa, al encontrarlo se le asignan los hijos de ese control y con esto la asignación queda como recursiva.*/
                                var objEncontrado = Enumerable.From(objPapa).Where('x => x.IdControl === "' + papa.id + '"').FirstOrDefault()
                                if (objEncontrado !== undefined) {
                                    objPapa = objEncontrado.Hijo;
                                }
                            };
                        });
                        /*Se adiciona al padre, el control para que quede adicionado como hijo.*/
                        objPapa.push(opcion);
                    };
                });

                /*Recorrido de las filas que se encuentren actualmente seleccionadas de la grilla padre inicial*/
                $.each(tblDatos.Seleccion, function (i, seleccion) {
                    var objGuarde = {}; //Objeto que contiene las propiedades de la entidad a almacenar
                    objGuarde[tblDatos.ServicioNombre] = seleccion.Id;

                    //Busco los controles correspondientes a la fila seleccionada
                    var objSeleccion = Enumerable.From(colSeleccionados).Where('x => $.isArray(x.control.Seleccion) && x.idRelacionado === ' + seleccion.Id).FirstOrDefault();
                    if (objSeleccion !== undefined) {
                        /*Entrando a esta opción se entiende que tiene otra grilla como hija, por lo cual se hace necesario realizar el recorrido de sus hijas
                        para posteriormente adherirla a colGuarda*/
                        fnRecursive({
                            objSeleccion: objSeleccion,
                            objGuarde: objGuarde
                        })
                    } else {
                        /*Al entrar a esta función se entiende que la grilla es unica y máximo tiene controles, los cuales se recorren para adicionar las propiedades a objGuarde
                        y que este se adicione a la colección a guardar*/
                        var colControl = Enumerable.From(colSeleccionados).Where('x => x.idRelacionado === ' + seleccion.Id).ToArray();
                        $.each(colControl, function (i, ctrl) {
                            objGuarde[ctrl.control.campo] = ctrl.control.control.value();
                        });
                        colGuarda.push(objGuarde);
                    };
                });

                /*Se adiciona la colección de registros adicionados a la propiedad en relación*/
                atributos.registroPadre[strNombreRelacion] = colGuarda;
                if (atributos.registroPadre.Id !== undefined) {
                    /*El llamado se hizo desde un registro que yá esta guardado en BD, por lo cual se actualiza el registro inmediatamente.*/
                    fnGuardaMultilista();
                } else {
                    /*Solo se refrescala grilla primaria, no se guarda nada en base de datos, debido a que se entiende que el objeto al cual se le adicionará la colección, esta pendiente por guardar.*/
                    atributos.grillaPadre.Actualizadata(atributos.registroPadre[strNombreRelacion]);
                    fnCancelaMultilista();
                };
            } else {
                thisJs.ModalMensaje({
                    Mensaje: 'No ha seleccionado ningun registro para asignar.',
                    Titulo: 'Seleccione registros'
                });
            };
        };
        var fnCancelaMultilista = function () {
            tblDatos.find('.k-minus').click();
            tblDatos.LimpiaSeleccion();
            $.each(colControlDetail, function (i, ctrl) {
                if ($.isFunction(ctrl.control.limpiar)) {
                    ctrl.control.limpiar();
                };
            });
            atributos.fnCancelar();
        };
        var fnAdicionaOtrosControles = function (atributo) {
            if (colServicioCampoMultiple.length <= 0) {
                fnPintaControles(atributo);
            } else {
                var blnPinta = true;
                $.each(colServicioCampoMultiple, function (index, multilista) {
                    if (atributo.tdDetalles.parents('.k-grid').length === (index + 1)) {
                        if ($.isEmptyObject(multilista.__DatoGrillaPintada)) {
                            //Asigno las columnas y data al servicio relacionado
                            multilista.__DatoGrillaPintada = {
                                NombreServicio: '',
                                ServicioCampo: [],
                                data: [],
                                colIdCreados: []
                            };

                            multilista.__DatoGrillaPintada.colIdCreados.push({
                                Ids: [{ id: atributo.objSeleccionado.Id }]
                            });
                            ConsultaGrillaExtra({
                                IdControl: atributo.objSeleccionado.Id,
                                IdRelacionado: multilista.ServicioCampoRelacionadoId,
                                objSeleccionado: atributo.objSeleccionado,
                                contenedor: atributo.tdDetalles,
                                InformacionServicio: multilista
                            });
                            blnPinta = false;
                            return false;
                        } else {
                            multilista.__DatoGrillaPintada.colIdCreados.push({
                                id: atributo.objSeleccionado.Id,
                            });
                            var Padres = [],
                                strIdSub = '';
                            $.each(atributo.tdDetalles.parents('.k-grid'), function (i, ctrl) {
                                Padres.push({ id: ctrl.id });
                                strIdSub += ctrl.id;
                            });
                            var tblSubGrilla = $('<div id="' + strIdSub + '-' + multilista.ServicioCampoRelacionadoId + '-' + atributo.objSeleccionado.Id + '"></div>');
                            colControlDetail.push({
                                padres: Padres,
                                control: tblSubGrilla,
                                idRelacionado: atributo.objSeleccionado.Id,
                                idServicio: multilista.ServicioCampoRelacionadoId
                            })
                            atributo.tdDetalles.empty();
                            atributo.tdDetalles.append($('<h4 class="page-title"> ' + multilista.__DatoGrillaPintada.NombreServicio + '</h4>'));
                            atributo.tdDetalles.append($('<div class="col-xs-12"></div>').append(tblSubGrilla));
                            fnCreaSubGrilla(tblSubGrilla, multilista.__DatoGrillaPintada.ServicioCampo, multilista.__DatoGrillaPintada.data, multilista.ServicioCampoRelacionadoId);
                            blnPinta = false;
                            return false
                        };
                    }
                });
                if (blnPinta === true) {
                    fnPintaControles(atributo);
                };
            };
        };
        var fnPintaControles = function (atributo, idServicio) {
            $.each(colServicioCampoPintar, function (i, vista) {
                vista.Id = vista.Id + '-' + atributo.objSeleccionado.Id;
                var objnewControl = thisJs.AdicionaControl({
                    control: vista,
                    dvContenedor: atributo.tdDetalles,
                });
                var Padres = [];
                $.each(atributo.tdDetalles.parents('.k-grid'), function (i, ctrl) {
                    Padres.push({ id: ctrl.id });
                });
                colControlDetail.push({
                    padres: Padres,
                    control: objnewControl,
                    idRelacionado: atributo.objSeleccionado.Id
                });
            });
        };
        var fnSeleccionaregistro = function (e) {
            if (e.checked === true) {
                e.fila.find('.k-plus').click();
            } else {
                e.fila.find('.k-icon').click();
            };
        };
        var fnConsultaOk = function (ok) {
            ok = JSON.parse(ok);
            if (ok.Resultado === false) {
                location.replace('error.html');
            } else {
                atributos.contenedor.empty();
                atributos.contenedor.append($('<h4 class="page-title"> ' + ok.Vistas[0].ServicioNombre + '</h4>'));
                atributos.contenedor.append($('<div class="col-xs-12"></div>').append(tblDatos));
                thisJs.AdicionaTabla({
                    colVista: ok.Vistas[0].ServicioCampoes,
                    dvTabla: tblDatos,
                    blnChecks: true,
                    blnAgrupar: false,
                    exportar: false,
                    blnFiltrar: true,
                    blnExpandeFilaClick: false,
                    fnDetails: (colServicioCampoPintar.length > 0 ? fnAdicionaOtrosControles : undefined),
                    fnCeldaCheck: fnSeleccionaregistro
                });
                tblDatos.ServicioId = objPrimerMultilista.ServicioCampoRelacionadoId;
                tblDatos.ServicioNombre = objPrimerMultilista.ServicioCampoNombre;
                if (objPrimerMultilista.ServicioCampoRelacionadoId !== undefined) {
                    ConsultaDataPrimerMultilista(objPrimerMultilista.ServicioCampoRelacionadoId);
                };

                var dvButtons = $('<div class="col-xs-12"></div>'),
                    btnGuarda = $('<button class="k-primary k-button pull-right">Guardar</button>'),
                    btnCancela = $('<button class="k-primary k-button pull-right">Cancelar</button>');

                dvButtons.append(btnCancela, btnGuarda);
                atributos.contenedor.prepend($('<div class="col-xs-12" style="padding-top:20px"></div>').append(dvButtons));
                btnCancela.bind('click', fnCancelaMultilista);
                btnGuarda.bind('click', fnArmaMultilista);
            };
        };
        var fnConsultaBad = function (bdInicio) {
            thisJs.CierraModales();
            thisJs.ModalMensaje({
                Mensaje: bdInicio,
                Titulo: 'Consulta fallida'
            });
        };
        var fnActualizaDatos = function (okData, tablaActualizar, InformacionServicio) {
            okData = JSON.parse(okData);
            if (okData.Resultado === false) {
                location.replace('error.html');
            } else {
                if (tablaActualizar === undefined) {
                    tblDatos.Actualizadata(JSON.parse(okData.Vistas));

                } else {
                    InformacionServicio.InformacionServicio.__DatoGrillaPintada.data = JSON.parse(okData.Vistas);
                    tablaActualizar.Actualizadata(InformacionServicio.InformacionServicio.__DatoGrillaPintada.data);
                };
            };
        };
        var ConsultaDataPrimerMultilista = function (idConculta, tablaActualizar, InformacionServicio) {
            thisJs.EjecutarAjax('', { idVista: idConculta, filtros: '', objBusqueda: '' }, function (okInfo) {
                fnActualizaDatos(okInfo, tablaActualizar, InformacionServicio);
            }, fnConsultaBad, '/Generico/ConsultaDatos');
        };
        var ConsultaGrillaExtra = function (atributos) {
            thisJs.EjecutarAjax('', { idVista: atributos.IdRelacionado }, function (OkConsulta) {
                fnPintaGrillaSubGrilla({
                    IdControl: atributos.IdControl,
                    respuesta: OkConsulta,
                    contenedor: atributos.contenedor,
                    InformacionServicio: atributos.InformacionServicio,
                    objSeleccionado: atributos.objSeleccionado
                });
            }, fnConsultaBad, '/Generico/IniciaFormulario');
        };
        var fnPintaGrillaSubGrilla = function (atributos) {
            var respuesta = JSON.parse(atributos.respuesta);
            if (respuesta.Resultado === false) {
                location.replace('error.html');
            } else {
                var Padres = [],
                    strIdSub = '';
                $.each(atributos.contenedor.parents('.k-grid'), function (i, ctrl) {
                    Padres.push({ id: ctrl.id });
                    strIdSub += ctrl.id;
                });
                var tblSubGrilla = $('<div id="' + strIdSub + '-' + respuesta.Vistas[0].Id + '-' + atributos.objSeleccionado.Id + '"></div>');

                colControlDetail.push({
                    padres: Padres,
                    control: tblSubGrilla,
                    idRelacionado: atributos.IdControl,
                    idServicio: atributos.InformacionServicio.ServicioCampoRelacionadoId
                });
                atributos.contenedor.empty();
                atributos.contenedor.append($('<h4 class="page-title"> ' + respuesta.Vistas[0].ServicioNombre + '</h4>'));
                atributos.contenedor.append($('<div class="col-xs-12"></div>').append(tblSubGrilla));
                atributos.InformacionServicio.__DatoGrillaPintada.ServicioCampo = respuesta.Vistas[0].ServicioCampoes;
                atributos.InformacionServicio.__DatoGrillaPintada.NombreServicio = respuesta.Vistas[0].ServicioNombre;
                fnCreaSubGrilla(tblSubGrilla, respuesta.Vistas[0].ServicioCampoes, [], atributos.InformacionServicio.ServicioCampoRelacionadoId)
                if (respuesta.Vistas[0].Id !== undefined) {
                    ConsultaDataPrimerMultilista(respuesta.Vistas[0].Id, tblSubGrilla, atributos);
                };
            };
        };
        var fnCreaSubGrilla = function (tabla, columna, data, idPadre) {
            thisJs.AdicionaTabla({
                colVista: columna,
                dvTabla: tabla,
                blnChecks: true,
                blnAgrupar: false,
                exportar: false,
                blnFiltrar: true,
                blnExpandeFilaClick: false,
                fnDetails: (colServicioCampoPintar.length > 0 ? fnAdicionaOtrosControles : undefined),
                fnCeldaCheck: fnSeleccionaregistro
            });
            if (data.length > 0) {
                tabla.Actualizadata(data);
            };
        };
        thisJs.EjecutarAjax('', { idVista: objPrimerMultilista.ServicioCampoRelacionadoId }, fnConsultaOk, fnConsultaBad, '/Generico/IniciaFormulario');
    };

    this.CharDonut = function (control, titulo, seriesDatos, seriesLabels, temaGrafica) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                position: "bottom",
                text: ""
            },
            legend: {
                visible: true
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                type: "donut",
                startAngle: 150,
                visible: true,
                labels: {
                    position: "outsideEnd",
                    visible: true,
                    background: "transparent"
                }
            },
            series: seriesDatos,

            tooltip: {
                visible: true,
                template: "#= category # (#= series.name #): #= value #"
            }
        });
    };

    this.ChartBarHorizontal = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, tituloEjeY, tituloEjeX) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "bar"
            },
            series: seriesDatos,
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            valueAxis: {
                max: 100,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    rotation: "auto"
                },
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "14px Arial,Helvetica,sans-serif" }
            },
            categoryAxis: {
                min: 0,
                max: 15,
                categories: seriesLabels,
                majorGridLines: {
                    visible: false
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" }
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= kendo.toString(value, 'n') #"
            }
        });
    }

    this.ChartBarVertical = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, formato, tituloEjeY, tituloEjeX, rotacion) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    format: formato
                }
            },
            series: seriesDatos,
            panes: [{
                clip: false
            }],
            valueAxis: {
                labels: {
                    format: formato
                },
                line: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                },
                axisCrossingValue: 0,
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "20px Arial,Helvetica,sans-serif" }
            },
            categoryAxis: {
                min: 0,
                max: 15,
                categories: seriesLabels,
                line: {
                    visible: false
                },
                labels: {
                    rotation: rotacion == undefined ? "auto" : rotacion
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" },

            },
            tooltip: {
                visible: true,
                format: formato,
                //template: "#= series.name #: #= kendo.toString(value, 'n') #"
                template: "(#= series.name #): #= value == null ? 0 : kendo.toString(value, '0.000000') #"
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            }

        });
    };

    this.ChartLine = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, tituloEjeY, tituloEjeX) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "line",
                style: "smooth"
            },
            series: seriesDatos,
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: -10,
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "20px Arial,Helvetica,sans-serif" }
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            categoryAxis: {
                min: 0,
                max: 15,
                categories: seriesLabels,
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" }
            },
            tooltip: {
                visible: true,
                format: "{0:0,00}",
                //template: "#= series.name #: #= value #"
                template: "#= series.name #: #= kendo.toString(value, 'n') #"
            }
        });
    };

    this.ChartLineLimite = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, formato, limiteSup, limiteInf, tituloEjeY, tituloEjeX) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "line",
                style: "smooth"
            },
            series: seriesDatos,
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                },
                plotBands: [{
                    from: limiteSup,
                    to: limiteInf,
                    color: "#c00",
                }],
                axisCrossingValue: -10,
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "20px Arial,Helvetica,sans-serif" }
            },
            categoryAxis: {
                min: 0,
                max: 15,
                categories: seriesLabels,
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" }
            },
            tooltip: {
                visible: true,
                format: formato,
                template: "#= series.name #: #= value #"
            }
        });
    };

    this.ChartArea = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, MargenLinea, tituloEjeY, tituloEjeX) {


        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {

                type: "area",
                area: {
                    line: {
                        style: "smooth"
                    }
                }
            },
            series: seriesDatos,
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            valueAxis: {
                labels: {
                    format: "{0}"
                },
                line: {
                    visible: false
                },
                plotBands: [{
                    from: MargenLinea == undefined ? 0 : MargenLinea,
                    to: MargenLinea == undefined ? 0 : MargenLinea + 25,
                    color: "#c00",
                    opacity: 0.8
                }],
                axisCrossingValue: -10,
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "20px Arial,Helvetica,sans-serif" }
            },
            categoryAxis: {
                min: 0,
                max: 50,
                categories: seriesLabels,
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" }
            },
            tooltip: {
                visible: true,
                format: "{0}",
                template: "#= series.name #: #= value #"
            }
        });
    };

    this.ChartGauge = function (control, seriesDatos, valor, maximo) {
        control.kendoRadialGauge({

            pointer: {
                value: valor,
                color: "rgba(255,102,0,.999)"
            },
            scale: {
                minorUnit: 5,
                startAngle: -30,
                endAngle: 210,
                max: maximo,
                labels: {
                    position: "inside"
                },
                ranges: seriesDatos
            }
        });

        var tooltip = control.kendoTooltip({
            filter: '[fill="rgba(255,102,0,.999)"]',
            position: "center",
            content: control.data("kendoRadialGauge").value(),
            show: function (e) {
                e.sender.options.content = control.data("kendoRadialGauge").value();
                e.sender.refresh();
            }
        }).data("kendoTooltip");
    };

    this.chartTreemap = function (control, titulo, seriesDatos, categorias, temaGrafica, formato, tituloEjeY, tituloEjeX) {

        control.kendoTreeMap({
            theme: temaGrafica,
            dataSource: {
                data: [{

                    items: seriesDatos
                    //     [{
                    //     name: "Group A",
                    //     value: 13,
                    //     items: [{ name: "foo", value: 1 }, { name: "bar", value: 2 }, { name: "baz", value: 3 }]
                    // }, {
                    //     name: "Group B",
                    //     value: 1,
                    //     items: [{ name: "foo", value: 1 }, { name: "bar", value: 2 }, { name: "baz", value: 3 }]
                    // }]
                }]
            },
            valueField: "value",
            textField: "name",
            //colors: [["#ff6666", "#ff0000"], ["#7fb17f", "#006400"]]
        });
    }


    this.ChartBarVerticalMultipleCategory = function (control, titulo, seriesDatos, categorias, temaGrafica, formato, tituloEjeY, tituloEjeX) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: seriesDatos,
            valueAxis: {
                labels: {
                    format: formato
                },
                line: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                },
                axisCrossingValue: 0,
                title: { text: tituloEjeY == undefined ? "" : tituloEjeY, font: "20px Arial,Helvetica,sans-serif" }
            },
            categoryAxis: categorias,
            //min: 0,
            //max: 15,

            //line: {
            //    visible: false
            //},
            //labels: {
            //    rotation: "auto"
            //},
            //title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "20px Arial,Helvetica,sans-serif" },


            tooltip: {
                visible: true,
                format: "{0:0,00}",
                template: "#= series.name #: #= kendo.toString(value, 'n') #"
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            }

        });
    };

    this.ChartBarVerticalMultipleValueAxis = function (control, titulo, seriesDatos, seriesLabels, temaGrafica, formato, tituloEjeY, tituloEjeX, rotacion, serievalueAxis) {
        control.kendoChart({
            theme: temaGrafica,
            title: {
                text: titulo
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                theme: temaGrafica,
                type: "column",
                labels: {
                    visible: true,
                    background: "transparent",
                    position: "insideEnd",
                    color: "black",
                    font: "12px Arial,Helvetica,sans-serif"
                }
            },
            series: seriesDatos,
            panes: [{
                clip: false
            }],
            valueAxis: serievalueAxis,
            categoryAxis: {
                min: 0,
                max: 15,
                categories: seriesLabels,
                line: {
                    visible: false
                },
                labels: {
                    rotation: rotacion == undefined || rotacion == "" ? "auto" : rotacion
                },
                title: { text: tituloEjeX == undefined ? "" : tituloEjeX, font: "9px Arial,Helvetica,sans-serif" },
                axisCrossingValues: [32, 0]
            },
            tooltip: {
                visible: true,
                format: "{0:0,00}",
                template: "(#= series.name #): #= value == null ? 0 : kendo.toString(value, '0.00') #"
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            }
        });
    };

    this.createMap = function () {
        $("#map").kendoMap({
            center: [4.6299999, -74.0997582],
            zoom: 11,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
            }],
            markers: [{
                location: [4.6299999, -74.0997582],
                shape: "customMarker",
                tooltip: {
                    content: '<div id="content">                                                                              '
                             + '   <div id="siteNotice">                                                                      '
                             + '   </div>                                                                                     '
                             + '      <h1 id="firstHeading" class="firstHeading">Mectronics</h1>                              '
                             + '   <div id="bodyContent">                                                                     '
                             + '       <p>Somos especialistas en Desarrollo de Aplicaciones de <br> Software, Planeación de Servicios de Operación, Programación de Recursos y Mantenimiento.</p> '
                             + '       <p>Calle 20C # 44-41 -- Puente Aranda</p> '
                             + '   </div>                                                                                     '
                             + '</div>                                                                                        '
                }
            },
                      {
                          location: [4.5725267, -74.09224499999999],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading">Patio 20 de Julio</h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>prestando un servicio público de transporte masivo de <br> pasajeros, con excelencia, sostenibilidad e innovación, orientado a satisfacer las necesidades de los <br> usuarios, colaboradores, accionistas y demás grupos de interés.</p> '
                                       + '       <p>Calle 32 Sur No. 3 C - 08</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }

                      },
                      {
                          location: [4.7077711, -74.11114939999999],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading">Calle 80</h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Somos un equipo humano competente, comprometido con la <br> prestación de servicio de transporte público de pasajeros del SITP de Bogotá cumpliendo con los estándares <br> de calidad requeridos, asegurando la satisfacción de nuestros clientes y la sostenibilidad de la organización.</p> '
                                       + '       <p>Avenida Calle 80 # 96-9</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      },
                      {
                          location: [4.5193789, -74.0913506],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading"></h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Consorcio Express Patio Juan Rey</p> '
                                       + '       <p>Transversal. 14 Este #72a Sur-1 a 72a Sur-65</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      },
                      {
                          location: [4.6300959, -74.20643050000001],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading"></h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Patio Bosa Consorcio Express</p> '
                                       + '       <p>Carrera 95A #74 Sur-37 a 74 Sur-99</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      },
                      {
                          location: [4.7688693, -74.0448907],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading"></h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Patio Calle 191 Consorcio Express</p> '
                                       + '       <p>Bogotá ‎-La Caro #19115</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      },
                      {
                          location: [4.5851697, -74.08153849999997],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading"></h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Patio Las Cruces Sitp Consorcio Express</p> '
                                       + '       <p>Carrera 6 # 17a Sur71</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      },
                      {
                          location: [4.7658733, -74.08014300000002],
                          shape: "customMarker",
                          tooltip: {
                              content: '<div id="content">                                                                            '
                                       + '   <div id="siteNotice">                                                                      '
                                       + '   </div>                                                                                     '
                                       + '      <h1 id="firstHeading" class="firstHeading"></h1>                            '
                                       + '   <div id="bodyContent">                                                                     '
                                       + '       <p>Patio La Conejera Consorcio Express</p> '
                                       + '       <p>Calle. 171 #10099, Bogotá</p> '
                                       + '   </div>                                                                                     '
                                       + '</div>                                                                                        '
                          }
                      }

            ]
        });
    }

};

