import axios from 'axios';

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
export const obtenerStockAlmacenes = async (objConsultaStocks) => {
    let arrayStockAlmacenes = [];
    let totalStock = 0;
    let response = await axios.post("http://localhost:3001/kardexAlmacen/consultaStocks", objConsultaStocks);
    if (response.data.length > 0) {
      arrayStockAlmacenes = response.data;
      totalStock = arrayStockAlmacenes.reduce((a, b) => a + b.stock, 0);
      arrayStockAlmacenes.push({descripcion:"STOCK GLOBAL",almacen:+999,stock: +totalStock});
      console.log("Se encontro informacion de Stock",response.data);
    } else {
      arrayStockAlmacenes = response.data;
      arrayStockAlmacenes.push({descripcion:"STOCK GLOBAL",almacen:+999,stock: +totalStock});
      console.log("Error: No se encontro informacion de Stock");
    }
    return arrayStockAlmacenes;
  };

  export const stockDisponibleAlmacenUsuario = (stockAlmacenes,idAlmacen) => {
    const almacenUsuario = stockAlmacenes.find((stock) => stock.almacen === idAlmacen);
    return almacenUsuario ? almacenUsuario.stock : 0;
  };