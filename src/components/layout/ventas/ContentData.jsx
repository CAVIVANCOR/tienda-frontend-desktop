import React, { useEffect, useState } from 'react';
import './ContentData.css';
import { useSelector } from 'react-redux';
import { Grid, _ } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

function ContentData() {
  const results = useSelector((state) => state.inicio.results);
  const [dataVista, setDataVista] = useState([]);
  const [datos, setDatos] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      console.log("Entro useEffect", results.length);
      updateData();
    }
  }, [results]);

  useEffect(() => {
    // Verificar si los datos están listos para renderizar el Grid
    if (datos.length > 0 && propiedades.length > 0) {
      setIsDataReady(true);
    }
  }, [datos, propiedades]);

  const handleEdit = (row) => {
    console.log("row", row.cells[0].data);
  };

  const updateData = () => {
    let total = 0;
    const updatedDataVista = results.map((venta) => {
      total = venta.DetVentas.reduce((prev, curr) => prev + +curr.pvTotalMN, 0);
      return {
        ID: +venta.id,
        SERIE: venta.serieDcmto,
        NUM: venta.correlativoDcmto,
        FECHA: venta.fecha,
        CLIENTE: venta.ClienteProveedor.razonSocial,
        PVTOTAL: +total,
      };
    });

    setDataVista(updatedDataVista);
    setDatos(updatedDataVista.map(objeto => Object.values(objeto)));
    setPropiedades(Object.keys(updatedDataVista[0]));
    let botonEditar = {
      name: "🔥",
      formatter: (cell, row) => {
        return _(<button className={"py-2 px-4 border rounded-md text-white bg-blue-600"} onClick={() => handleEdit(row)}>Edit</button>)
      }
    };
    setPropiedades(prevPropiedades => [...prevPropiedades, botonEditar]);
  };

  return (
    <div className='content-data'>
      {isDataReady &&
        <div id="grid-container">
          <Grid
            data={datos}
            columns={propiedades}
            pagination={{
              enabled: true,
              limit: 6,
              summary: true
            }}
            sort={{
              enabled: true
            }}
            autoWidth={true}
            className={{
              container: 'my-custom-container-class',
              table: 'my-custom-table-class',
              th: 'my-custom-th-class',
              td: 'my-custom-td-class',
              pagination: 'my-custom-pagination-class',
              'paginationSummary': 'my-custom-pagination-summary-class',
              tbody: 'my-custom-tbody-class'
            }}
            search={{
              enabled: true
            }}
            style={{
              width: '100%',
              'minWidth': '300px',
              table: {
                'border': "3px solid #ccc",
                'margin-top': "1rem"
              },
              th: {
                'background-color': 'var(--border-color)',
                'color': 'var(--body-color)',
              },
              td: {
                "text-align": "left"
              }
            }}
            language={{
              search: {
                placeholder: '🔍 Search...',
              },
              sort: {
                'sortAsc': 'Sort column ascending',
                'sortDesc': 'Sort column descending',
              },
              pagination: {
                previous: '⬅️',
                next: '➡️',
                navigate: (page, pages) => `Page ${page} of ${pages}`,
                page: (page) => `Page ${page}`,
                showing: 'Mostrando',
                of: 'de',
                to: 'al',
                results: 'registros',
              },
              loading: 'Loading...',
              'noRecordsFound': 'No matching records found',
              error: 'An error happened while fetching the data'
            }}
          />
        </div>
      }
    </div>
  );
}

export default ContentData;
