import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const prepararDataDetVentas = async(dataTemporalVentas,detalleVentas,handleEditDetVentas,handleDeleteDetVentas,setDetTableData,setDetTableColumns,setTotalesCabVentas) => {
  console.log("prepararDataDetVentas: >>>>>>>>>>>>>>dataTemporalVentas:", dataTemporalVentas, "detalleVentas",detalleVentas);
    let totales = {
      valorVentaTotal: 0,
      descuentoTotal: 0,
      porcentajeDescuentoTotal: 0,
      valorVentaNetoTotal: 0,
      igvTotal: 0,
      precioVentaTotal: 0
    }
    if (dataTemporalVentas.moneda){
      totales.valorVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvUnitME*+curr.cantidad), 0);
      totales.descuentoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.descUnitME*+curr.cantidad), 0);
      totales.valorVentaNetoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvNetoTotME), 0);
      totales.igvTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.igvTotalME), 0);
      totales.precioVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.pvTotalME), 0);
      totales.porcentajeDescuentoTotal = (totales.descuentoTotal / totales.valorVentaTotal) * 100;
    } else {
      totales.valorVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvUnitMN*+curr.cantidad), 0);
      totales.descuentoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.descUnitMN*+curr.cantidad), 0);
      totales.valorVentaNetoTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.vvNetoTotMN), 0);
      totales.igvTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.igvTotalMN), 0);
      totales.precioVentaTotal = detalleVentas.reduce((prev, curr) => prev + (+curr.pvTotalMN), 0);
      totales.porcentajeDescuentoTotal = (totales.descuentoTotal / totales.valorVentaTotal) * 100;
    }
    console.log("totales", totales);
    let dataPreparada = await Promise.all(detalleVentas.map((detVenta) => {
      let totalesFormateado = {
        valorVentaTotal: 0,
        descuentoTotal: 0,
        porcentajeDescuentoTotal: 0,
        valorVentaNetoTotal: 0,
        igvTotal: 0,
        precioVentaTotal: 0
      }
      if (dataTemporalVentas.moneda){
        totalesFormateado.valorVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvUnitME*+detVenta.cantidad)); 
        totalesFormateado.descuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.descUnitME*+detVenta.cantidad));
        totalesFormateado.valorVentaNetoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvNetoTotME));
        totalesFormateado.igvTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.igvTotalME));
        // totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format((+detVenta.pvTotalME));
        totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.pvTotalME));
        totalesFormateado.porcentajeDescuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(((+detVenta.descUnitME*+detVenta.cantidad) / (+detVenta.vvUnitME*+detVenta.cantidad)) * 100);
      } else {
        totalesFormateado.valorVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvUnitMN*+detVenta.cantidad)); 
        totalesFormateado.descuentoTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.descUnitMN*+detVenta.cantidad));
        totalesFormateado.valorVentaNetoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.vvNetoTotMN));
        totalesFormateado.igvTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.igvTotalMN));
        totalesFormateado.precioVentaTotal = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.pvTotalMN));
        totalesFormateado.porcentajeDescuentoTotal = new Intl.NumberFormat('es-PE',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(((+detVenta.descUnitMN*+detVenta.cantidad) / (+detVenta.vvUnitMN*+detVenta.cantidad)) * 100);
      }
        return {
            producto: detVenta.Producto.descripcion,
            cantidad: new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((+detVenta.cantidad)),
            descuento: totalesFormateado.descuentoTotal,
            pvtotal: totalesFormateado.precioVentaTotal,
            vventa: totalesFormateado.valorVentaTotal,
            descPorc: totalesFormateado.porcentajeDescuentoTotal,
            vventaneto: totalesFormateado.valorVentaNetoTotal,
            igv: totalesFormateado.igvTotal,
            id: +detVenta.id,
            };
        }));
    let columns =[{
                    field: 'producto',
                    headerName: 'Producto',
                    width: 300,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'left',
                    headerAlign: 'center',
                  },
                  {
                    field: 'cantidad',
                    headerName: 'Cant.',
                    width: 100,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'descuento',
                    headerName: 'Desc.',
                    width: 100,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'pvtotal',
                    headerName: 'PV',
                    width: 110,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'actions',
                    headerName: '',
                    width: 80,
                    renderCell: (params) => (
                        <>
                            <IconButton onClick={() => handleEditDetVentas(params.row)}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteDetVentas(params.row)}>
                                <Delete />
                            </IconButton>
                        </>
                    ),
                  },
                  {
                    field: 'vventa',
                    headerName: 'VVenta',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'descPorc',
                    headerName: '%Desc.',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'vventaneto',
                    headerName: 'VNeto',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'igv',
                    headerName: 'IGV',
                    width: 100,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  },
                  {
                    field: 'id',
                    headerName: 'ID',
                    width: 120,
                    editable: false,
                    valueFormatter: (params) => `${params.value}`,
                    align: 'right',
                    headerAlign: 'center',
                  }
  ];
    setDetTableData(dataPreparada);
    setDetTableColumns(columns);
    setTotalesCabVentas(totales);
};