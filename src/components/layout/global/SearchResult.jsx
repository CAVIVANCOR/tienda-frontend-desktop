/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import VerStockModal from './VerStockModal';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import VerDescuentosModal from './VerDescuentosModal';
import VerFichaProductoModal from './VerFichaProductoModal';
import { obtenerStockAlmacenes } from '../ventas/bOperacionesApiData';
function SearchResult (props) {
  console.log("Entro a SearchResult props:",props);
  const usuarioLogueado = useSelector((state) => state.login.user);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [showDescuentosModal, setShowDescuentosModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAlmacenes, setStockAlmacenes] = useState([]);
  useEffect(() => {
    actualizarEstadoStockAlmacenes({ProductoId: +props.dataCompleta.id, idAlmacen: +usuarioLogueado.AlmacenId});
  },[props, usuarioLogueado]);
  const openFotoModal = () => {
    setShowFotoModal(true);
  };
  const closeFotoModal = () => {
    setShowFotoModal(false);
  };
  const openDescuentosModal = () => {
    setShowDescuentosModal(true);
  };
  const closeDescuentosModal = () => {
    setShowDescuentosModal(false);
  };
  const openStockModal = () => {
    setShowStockModal(true);
  };
  const closeStockModal = () => {
    setShowStockModal(false);
  };

  const actualizarEstadoStockAlmacenes = async (objConsultaStocks) => {
    let arrayStockAlmacenes = await obtenerStockAlmacenes(objConsultaStocks);
    setStockAlmacenes(arrayStockAlmacenes);
  }
  useEffect(() => {
    if (showStockModal) {
      console.log("Entro al clic del div stock",{ProductoId: +props.dataCompleta.id})
      actualizarEstadoStockAlmacenes({ProductoId: +props.dataCompleta.id});
      console.log(stockAlmacenes);
    } 
  }, [showStockModal]);
  return (
    <Card align="center" sx={{maxWidth: 345,":hover": {borderRadius: "35px", transition: "transform 0.5s ease-in-out", transform: "scale(1.1)"}}}>
      <CardContent align="center" sx={{height: 60, backgroundColor: 'lightgrey'}}>
        <Typography sx={{fontSize: 14, fontStyle: 'italic', color: '#001e3a'}} >{props.dataCompleta.descripcion}</Typography>
      </CardContent>
      <CardMedia 
        component="img"
        alt="Foto del Producto"
        height="140"
        image={props.urlFotoProducto}
        onClick={openFotoModal}
        sx={{cursor: "pointer", border: "1px solid black"}}
      />
      <CardContent>
        <Grid2 container spacing={1} columns={{ xs: 2, sm: 2, md: 2 }}>
          <Grid2 xs={1} sm={1} md={1} onClick={openDescuentosModal} sx={{cursor: "pointer"}} >
            <Typography>P.V.Unit.:</Typography>
            <Typography>{props.dataCompleta.valorVentaUnitMN}</Typography>
          </Grid2>
          {stockAlmacenes.length>0 && (
            <Grid2 xs={1} sm={1} md={1} onClick={openStockModal} sx={{cursor: "pointer"}}>
              <Typography>STOCK:</Typography>
              <Typography>{stockAlmacenes[0].stock}</Typography>
            </Grid2>
          )}
        </Grid2>
      </CardContent>
      {showStockModal && (<VerStockModal isOpen={showStockModal} onClose={closeStockModal} props={props} stockAlmacenes={stockAlmacenes} />)}
      {showDescuentosModal && (<VerDescuentosModal isOpen={showDescuentosModal} onClose={closeDescuentosModal} props={props} />)}
      {showFotoModal && (<VerFichaProductoModal isOpen={showFotoModal} onClose={closeFotoModal} props={props} />)}
    </Card>
  );
}
export default SearchResult;