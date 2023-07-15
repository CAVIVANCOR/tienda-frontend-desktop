/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import "./SearchResult.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';

function SearchResult (props) {
  const usuarioLogueado = useSelector((state) => state.login.user);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [showDescuentosModal, setShowDescuentosModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAlmacenes, setStockAlmacenes] = useState([]);
  useEffect(() => {
    console.log("XXXXXXXXXXXXXXXXXXXX Data Obtener Stock por Almacen",{ProductoId: +props.dataCompleta.id, idAlmacen: +usuarioLogueado.AlmacenId})
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
    <div className='card-main'>
      <Link to="#" key={props.dataCompleta.id} className="search-result-link">
        <div className='card-container'>
          <figure>
            <img src={props.urlFotoProducto} alt="Foto del Producto" onClick={openFotoModal}  />
          </figure>
          <div className='product-container'>
            <div className='product-descripcion'>
              <h2>{props.dataCompleta.descripcion}</h2>
            </div>
            <div className='product-precio-stock'>
              <div className='product-precio' onClick={openDescuentosModal}>
                <h2>P.V.Unit.:</h2>
                <h3>{props.dataCompleta.valorVentaUnitMN}</h3>
              </div>
                {stockAlmacenes.length>0 && (
                  <div className='product-stock' onClick={openStockModal}>
                    <h2>{stockAlmacenes[0].descripcion}</h2>
                    <h3>{stockAlmacenes[0].stock}</h3>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Link>
      {showFotoModal && (
        <div className="ventana-modal">
          <div className="ventana-modal-content">
            <div className='ventana-modal-content-info'>
              <div className="foto-producto">
                <img src={props.urlFotoProducto} alt="Foto Producto"/>
              </div>
              <div className='descripcion-producto'>
                <h2>{props.dataCompleta.descripcion}</h2>
              </div>
              <div className='codigos-producto'>
                <div className='codigo-proveedor-producto'>
                  <h4>Cod. Proveedor</h4>
                  {props.dataCompleta.codigoProveedor ? <h2>{props.dataCompleta.codigoProveedor}</h2> : <h2>S/I</h2> }
                </div>
                <div className='modelo-fabricante-producto'>
                  <h4>Mod. Fabricante</h4>
                  {props.dataCompleta.modeloFabricante ? <h2>{props.dataCompleta.modeloFabricante}</h2> : <h2>S/I</h2> }
                </div>
              </div>
              <div className='agrupacion-producto'>
                <div className='familia-producto'>
                  <h4>Familia</h4>
                  <h2>{props.dataCompleta.SubFamilium.Familium.descripcion}</h2>
                </div>
                <div className='subfamilia-producto'>
                  <h4>SubFamilia</h4>
                  <h2>{props.dataCompleta.SubFamilium.descripcion}</h2>
                </div>
              </div>
              <div className='representacion-producto'>
                <div className='marca-producto'>
                  <h4>Marca</h4>
                  <h2>{props.dataCompleta.ModeloMarca.Marca.descripcion}</h2>
                </div>
                <div className='modelo-marca-producto'>
                  <h4>Modelo</h4>
                  <h2>{props.dataCompleta.ModeloMarca.descripcion}</h2>
                </div>
              </div>
              <div className='estructura-producto'>
                <div className='color-producto'>
                  <h4>Color</h4>
                  <h2>{props.dataCompleta.Colore.descripcion}</h2>
                </div>
                <div className='material-producto'>
                  <h4>Material</h4>
                  <h2>{props.dataCompleta.Materiale.descripcion}</h2>
                </div>
              </div>
              <div className='origen-producto'>
                <div className='ano-producto'>
                  <h4>Año</h4>
                  <h2>{props.dataCompleta.Ano.descripcion}</h2>
                </div>
                <div className='procedencia-producto'>
                  <h4>Procedencia</h4>
                  <h2>{props.dataCompleta.Procedencium.descripcion}</h2>
                </div>
              </div>
              <div className='caracteristicas-producto'>
                <div className='lado-producto'>
                  <h4>Lado</h4>
                  <h2>{props.dataCompleta.Lado.descripcion}</h2>
                </div>
                <div className='um-producto'>
                  <h4>Unid. Medida</h4>
                  <h2>{props.dataCompleta.UMProd.descripcion}</h2>
                </div>
              </div>
            </div>
            <div className='ventana-modal-content-btn'>
              <button onClick={closeFotoModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
      {showDescuentosModal && (
        <div className="ventana-modal-precios">
          <div className="ventana-modal-content">
            <div className='ventana-modal-content-info'>
                <div className="foto-producto">
                  <img src={props.urlFotoProducto} alt="Foto Producto"/>
                </div>
                <div className='descripcion-producto'>
                  <h2>{props.dataCompleta.descripcion}</h2>
                </div>
                <div className='codigos-producto'>
                  <div className='codigo-proveedor-producto'>
                    <h4>Cod. Proveedor</h4>
                    {props.dataCompleta.codigoProveedor ? <h2>{props.dataCompleta.codigoProveedor}</h2> : <h2>S/I</h2> }
                  </div>
                  <div className='modelo-fabricante-producto'>
                    <h4>Mod. Fabricante</h4>
                    {props.dataCompleta.modeloFabricante ? <h2>{props.dataCompleta.modeloFabricante}</h2> : <h2>S/I</h2> }
                  </div>
                </div>
                <div className='descuentos-producto'>
                  <div className='costo-producto'>
                    <h4>C.Unit</h4>
                    <h2>{props.dataCompleta.costoUnitarioMN}</h2>
                  </div>
                  <div className='descmaxca-producto'>
                    <h4>%Desc.C/A</h4>
                    <h2>{props.dataCompleta.porcentajeMaxDescConAutorizacion}</h2>
                  </div>
                  <div className='descmaxsa-producto'>
                    <h4>%Desc.S/A</h4>
                    <h2>{props.dataCompleta.porcentajeMaxDescSinAutorizacion}</h2>
                  </div>
                  <div className='descxcant-producto'>
                    <h4>%Desc.P/C</h4>
                    <h2>{props.dataCompleta.porcentajeMaxDescPorCantidad}</h2>
                  </div>
                  <div className='cantaplicadesc-producto'>
                    <h4>Cant.A/D</h4>
                    <h2>{props.dataCompleta.cantidadAplicaDesc}</h2>
                  </div>
                </div>
                <div className='precios-producto'>
                  <div className='vventa-producto'>
                    <h4>V.V.Unit</h4>
                    <h2>{props.dataCompleta.valorVentaUnitMN}</h2>
                  </div>
                  <div className='pventa-producto'>
                    <h4>P.V.Unit</h4>
                    <h2>{props.dataCompleta.valorVentaUnitMN}</h2>
                  </div>
                </div>
            </div>
            <div className='ventana-modal-content-btn'>
              <button onClick={closeDescuentosModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
      {showStockModal && (
        <div className="ventana-modal-stocks">
          <div className="ventana-modal-content">
          <div className='ventana-modal-content-info'>
                <div className="foto-producto">
                  <img src={props.urlFotoProducto} alt="Foto Producto"/>
                </div>
                <div className='descripcion-producto'>
                  <h2>{props.dataCompleta.descripcion}</h2>
                </div>
                <div className='codigos-producto'>
                  <div className='codigo-proveedor-producto'>
                    <h4>Cod. Proveedor</h4>
                    {props.dataCompleta.codigoProveedor ? <h2>{props.dataCompleta.codigoProveedor}</h2> : <h2>S/I</h2> }
                  </div>
                  <div className='modelo-fabricante-producto'>
                    <h4>Mod. Fabricante</h4>
                    {props.dataCompleta.modeloFabricante ? <h2>{props.dataCompleta.modeloFabricante}</h2> : <h2>S/I</h2> }
                  </div>
                </div>
                <div className='stocks-producto'>
                  {stockAlmacenes.map((alm, id) => {
                    return (
                      <div key={id} className='almacen-producto'>
                        <h4>{alm.descripcion}</h4>
                        <h2>{alm.stock}</h2>
                      </div>
                    )})}
                </div>
            </div>
            <div className='ventana-modal-content-btn'>
              <button onClick={closeStockModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
