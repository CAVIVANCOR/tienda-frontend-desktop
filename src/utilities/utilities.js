export const valorMaxArray = (array)=>{
    //**Encuentra el valor Maximo de un array */
    return Math.max(...array);
}

export const valorMinArray = (array)=>{
    //**Encuentra el valor Minimo de un array */
    return Math.min(...array);
}

export const objetoEstaVacio = (objeto)=>{
    //**Verifica si un objeto esta vacio */
    return Object.keys(objeto).length === 0;
}

export const obtenerValorDeObjeto = (path, obj)=>{
    //**Recuperar el valor de un objeto, pasando el path como string */
    //** Uso: obtenerValorDeObjeto('a.b.c', {a:{b:{c:1}}}) => 1  */
    return path.split('.').reduce((a,c)=>a?.[c], obj);
}

export const sumatoriaValoresArray = (array)=>{
    //**suma todos los valores de un array */
    return array.reduce((a,b)=>a+b,0);
}

export const quitarRepetidosArray = (array)=>{
    //**Quita los valores repetidos de un array */
    return [...new Set(array)];
}

export const cuentaOcurrenciasArray = (val, array)=>{
    ///**Cuenta las veces que sale un valor en un array */
    //**Uso: cuentaOcurrenciasArray('a', ['a','b','a','c']) => 2 */
    return array.reduce((a,v)=> (v === val ? a + 1 : a),0);    
}

export const numeroEsPar = (numero)=>{
    //**Verifica si un numero es par */
    //**Uso: numeroEsPar(2) => true */
    return numero % 2 === 0;
}

export const redondearNumeroNDecimales = (numero, decimales)=>{
    //**Redondea un numero a un numero de decimales */
    //**Uso: redondearNumeroNDecimales(1.234, 2) => 1.23 */
    return +numero.toFixed(decimales);
}

export const numAleatorioDesdeRango = (min, max)=>{
    //**Devuelve un numero aleatorio entre min y max */
    //**Uso: numAleatorioDesdeRango(1, 10) => 5 */
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const stringAleatorioNChars = (nChars)=>{
    //**Devuelve un string aleatorio de n caracteres */
    //**Uso: stringAleatorioNChars(10) => '1234567890' */
    return Math.random().toString(36).substring(2, 2 + nChars);
}

export const eliminarEspaciosInnecesarios = (texto)=>{
    //**Elimina los espacios innecesarios de un texto */
    //**Uso: eliminarEspaciosInnecesarios(' Hola  que  tal ') => 'Hola que tal' */
    return texto.replace(/  +/g, ' ').trim();
}

export const formatDateStringToyyyymmdd = (fechaStringddmmyyyy) => {
    const fechaPartes = fechaStringddmmyyyy.split("/");
    const dia = fechaPartes[0];
    const mes = fechaPartes[1];
    const anio = fechaPartes[2];
    const fechaFormateada = `${anio}/${mes}/${dia}`;
    return fechaFormateada;
  };

export const formatDateStringToddmmyyyy = (fechaStringyyyymmdd) => {
    const fecha = new Date(fechaStringyyyymmdd);
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getUTCFullYear().toString();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
  };
  
export const detectarDispositivo = () => {
    const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const mediaQueryCelular = window.matchMedia('(max-width: 767px)');
    if (mediaQueryDesktop.matches) {
        return 'Desktop';
    } else if (mediaQueryTablet.matches) {
        return 'Tablet';
    } else if (mediaQueryCelular.matches) {
        return 'Celular';
    } else {
        return 'Desconocido';
    }
};