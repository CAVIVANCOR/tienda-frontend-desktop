/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import VerStockModal from './VerStockModal';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import VerDescuentosModal from './VerDescuentosModal';
import VerFichaProductoModal from './VerFichaProductoModal';
function SearchResult (props) {
  const usuarioLogueado = useSelector((state) => state.login.user);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [showDescuentosModal, setShowDescuentosModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAlmacenes, setStockAlmacenes] = useState([]);
  useEffect(() => {
    obtenerStockAlmacenes({ProductoId: +props.dataCompleta.id, idAlmacen: +usuarioLogueado.AlmacenId});
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
  const obtenerStockAlmacenes = async (objConsultaStocks) => {
      let response = await axios.post("http://localhost:3001/kardexAlmacen/consultaStocks", objConsultaStocks);
      if (response.data.length > 0) {
        let arrayStockAlmacenes = response.data;
        let totalStock = arrayStockAlmacenes.reduce((a, b) => a + b.stock, 0)
        arrayStockAlmacenes.push({descripcion:"STOCK GLOBAL",almacen:+999,stock: +totalStock})
        await setStockAlmacenes(arrayStockAlmacenes)
      } else {
        let arrayStockAlmacenes = response.data;
        let totalStock = 0
        arrayStockAlmacenes.push({descripcion:"STOCK GLOBAL",almacen:+999,stock: +totalStock})
        await setStockAlmacenes(arrayStockAlmacenes);
        console.log("Error: No se encontro informacion de Stock");
      }
  };
  useEffect(() => {
    if (showStockModal) {
      console.log("Entro al clic del div stock",{ProductoId: +props.dataCompleta.id})
      obtenerStockAlmacenes({ProductoId: +props.dataCompleta.id});
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