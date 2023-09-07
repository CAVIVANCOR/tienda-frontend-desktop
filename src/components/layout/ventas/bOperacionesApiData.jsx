import axios from 'axios';
export const grabarCabVentas = async (dataTemporalVentas, setFichaDataVentas,formatDateStringToyyyymmdd, detalleVentas,  setDetalleVentas) => {
    let porcentajeDescUnit=0;
    let vvUnitME=0;
    let descUnitME=0;
    let vvNetoUnitME=0;
    let igvUnitME=0;
    let pvUnitME=0;
    let vvNetoTotME=0;
    let igvTotalME=0;
    let pvTotalME=0;
    let vvUnitMN=0;
    let descUnitMN=0;
    let vvNetoUnitMN=0;
    let igvUnitMN=0;
    let pvUnitMN=0;
    let vvNetoTotMN=0;
    let igvTotalMN=0;
    let pvTotalMN=0;
    let detalleVentaCalculado = await Promise.all(detalleVentas.map((detVenta) => {
        porcentajeDescUnit=+detVenta.porcentajeDescUnit;
        if (dataTemporalVentas.moneda){
            vvUnitME=(+detVenta.vvUnitME);
            descUnitME=((+detVenta.vvUnitME)*(+detVenta.porcentajeDescUnit/100));
            vvNetoUnitME = (+detVenta.vvUnitME)-(+descUnitME);
            igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
            pvUnitME = vvNetoUnitME+igvUnitME
            vvNetoTotME=(+vvNetoUnitME)*(+detVenta.cantidad);
            igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
            pvTotalME=(+vvNetoTotME)+(+igvTotalME);
            vvUnitMN=(+vvUnitME)*(+dataTemporalVentas.tipoCambio);
            descUnitMN=(+descUnitME)*(+dataTemporalVentas.tipoCambio);
            vvNetoUnitMN = (+detVenta.vvUnitMN)-(+descUnitMN);
            igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
            pvUnitMN = vvNetoUnitMN+igvUnitMN
            vvNetoTotMN=(+vvNetoUnitMN)*(+detVenta.cantidad);
            igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
            pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
        } else {
            vvUnitMN=(+detVenta.vvUnitMN);
            descUnitMN=((+detVenta.vvUnitMN)*(+detVenta.porcentajeDescUnit/100));
            vvNetoUnitMN = (+detVenta.vvUnitMN)-(+descUnitMN);
            igvUnitMN = (+vvNetoUnitMN)*(+dataTemporalVentas.porcentajeIGV/100);
            pvUnitMN = vvNetoUnitMN+igvUnitMN
            vvNetoTotMN=(+vvNetoUnitMN)*(+detVenta.cantidad);
            igvTotalMN=(+vvNetoTotMN)*(+dataTemporalVentas.porcentajeIGV/100);
            pvTotalMN=(+vvNetoTotMN)+(+igvTotalMN);
            vvUnitME=(+vvUnitMN)/(+dataTemporalVentas.tipoCambio);
            descUnitME=(+descUnitMN)/(+dataTemporalVentas.tipoCambio);
            vvNetoUnitME = (+detVenta.vvUnitME)-(+descUnitME);
            igvUnitME = (+vvNetoUnitME)*(+dataTemporalVentas.porcentajeIGV/100);
            pvUnitME = vvNetoUnitME+igvUnitME
            vvNetoTotME=(+vvNetoUnitME)*(+detVenta.cantidad);
            igvTotalME=(+vvNetoTotME)*(+dataTemporalVentas.porcentajeIGV/100);
            pvTotalME=(+vvNetoTotME)+(+igvTotalME);
        }
        return {
            ...detVenta,
            vvUnitME:vvUnitME,
            porcentajeDescUnit: porcentajeDescUnit,
            descUnitME: descUnitME,
            vvNetoUnitME: vvNetoUnitME,
            igvUnitME: igvUnitME,
            pvUnitME: pvUnitME,
            vvNetoTotME: vvNetoTotME,
            igvTotalME: igvTotalME,
            pvTotalME: pvTotalME,
            vvUnitMN:vvUnitMN,
            descUnitMN: descUnitMN,
            vvNetoUnitMN: vvNetoUnitMN,
            igvUnitMN: igvUnitMN,
            pvUnitMN: pvUnitMN,
            vvNetoTotMN: vvNetoTotMN,
            igvTotalMN: igvTotalMN,
            pvTotalMN: pvTotalMN
            }
        }));
    setDetalleVentas(detalleVentaCalculado);
    setFichaDataVentas(dataTemporalVentas);
    const datosCodificados = {
        id: +dataTemporalVentas.id,
        fecha: formatDateStringToyyyymmdd(dataTemporalVentas.fecha),
        serieDcmto: dataTemporalVentas.serieDcmto,
        correlativoDcmto: dataTemporalVentas.correlativoDcmto,
        idContacto: +dataTemporalVentas.idContacto,
        idDirOrigen: +dataTemporalVentas.idDirOrigen,
        idDirEntrega: +dataTemporalVentas.idDirEntrega,
        observaciones: dataTemporalVentas.observaciones,
        idDocAlmacen: +dataTemporalVentas.idDocAlmacen,
        idVendedor: +dataTemporalVentas.idVendedor,
        idTecnico: +dataTemporalVentas.idTecnico,
        numPlacas: dataTemporalVentas.numPlacas,
        tipoCambio: +dataTemporalVentas.tipoCambio,
        porcentajeIGV: +dataTemporalVentas.porcentajeIGV,
        emailDestino: dataTemporalVentas.emailDestino,
        rutaDcmtoPDF: dataTemporalVentas.rutaDcmtoPDF,
        exonerado: dataTemporalVentas.exonerado,
        moneda: dataTemporalVentas.moneda,
        factElectOK: dataTemporalVentas.factElectOK,
        anticipo: dataTemporalVentas.anticipo,
        created: dataTemporalVentas.created,
        borradoLogico: dataTemporalVentas.borradoLogico,
        idHistorico: +dataTemporalVentas.idHistorico,
        ClienteProveedorId: +dataTemporalVentas.ClienteProveedorId,
        FormaPagoId: +dataTemporalVentas.FormaPagoId,
        EstadoDocId: +dataTemporalVentas.EstadoDocId,
        UsuarioId: +dataTemporalVentas.UsuarioId,
        TipoCambioId: +dataTemporalVentas.TipoCambioId,
        CentroCostoId: +dataTemporalVentas.CentroCostoId,
        CorrelativoDocId: +dataTemporalVentas.CorrelativoDocId
    };
    try {
        let regCabVentasUpdated = await axios.put("http://localhost:3001/cabVentas/update/"+datosCodificados.id, datosCodificados);
        if (!regCabVentasUpdated.data) console.log("Error: No se pudo Actualizar la Informacion de la Cabecera de Ventas");
    } catch (error) {
        console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
    }
};
export const cargarDescripcionPersonal = async (id, cargaNombres) => {
    if (id>0){
        try {
            let reg = await axios.post('http://localhost:3001/personal/search', { id });
            if (!reg) throw new Error("Error: No se encontraron Datos del Personal");
            cargaNombres(reg.data[0].nombres);
        } catch (error) {
            console.log("Error",error);
        }
    }
};
export const obtenerTCsegunFecha = async (fecha) =>{
    try {
        let reg = await axios.post('http://localhost:3001/tiposCambio/search', { fecha });
        if (reg.data.length ===0){
            let reg = await axios.get('http://localhost:3001/tiposCambio/last');
            if (!reg) throw new Error("Error: No se encontraron Datos en Tipo de Cambio");
            let regNew = await axios.post('http://localhost:3001/tiposCambio', { fecha: fecha, compra: +reg.data.compra, venta: +reg.data.venta, idHistorico:0});
            return regNew.data;
        }else{
            return reg.data[0];
        }
    } catch (error) {
        console.log("Error",error);
    }
};