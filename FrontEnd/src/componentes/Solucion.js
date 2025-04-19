import { useState, useEffect } from 'react';
import Header from './Header';
function Solucion(){
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const fechtData = async ()=>{
        try {
          const response = await fetch('http://localhost:3000/ing');
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.log(error);
            }
    };
    const fechtDatas = async () => {
        try {
            const response = await fetch('http://localhost:3000/activosdos');
            const result = await response.json();
            setDatas(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fechtData2 = async () => {
        try {
            const response = await fetch('http://localhost:3000/activos');
            const result = await response.json();
            setData2(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fechtData3 = async () => {
        try {
            const response = await fetch('http://localhost:3000/getraz');
            const result = await response.json();
            setData3(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fechtData4 = async () => {
        try {
            const response = await fetch('http://localhost:3000/getsus');
            const result = await response.json();
            setData4(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fechtData5 = async () => {
        try {
            const response = await fetch('http://localhost:3000/getroe');
            const result = await response.json();
            setData5(result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fechtData();
        fechtDatas();
        fechtData2();
        fechtData3();
        fechtData4();
        fechtData5();
    }, []);
    const Elements = data.map(dato => (
        <div key={dato.id} class="flex flex-col items-center w-100">
            <div class="w-[800px] h-100 flex flex-col m-5">
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <h3>PHILIPPE CORPORATION <hr></hr> Estado de resultados en términos porcentuales 2009</h3>
                </div>
                <div class="flex flex-col border border-gray-400">
                    <div class="flex flex-row">
                        <div class="flex flex-col justify-center items-start w-[50%] p-5 text-lg">
                            <p class=""> Ventas</p>
                            <p> Costo de ventas</p>
                            <p>Depreciación</p>
                            <p>Utilidad antes de intereses e impuestos</p>
                            <p>Intereses pagados</p>
                            <p> Utilidad gravable</p>
                            <p> Impuestos (34%)</p>
                            <p>Utilidad neta</p>
                        </div >
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5 pt-5">
                            <p class="text-lg font-light text-black tracking-widest"> 100 %</p>
                            <p class="text-lg font-light text-black">{dato.utilidadPorcentual1.costoDeVentasPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2 ">{dato.utilidadPorcentual2.depreciacionPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black tracking-widest">     {dato.utilidadPorcentual3.UtilidadAntesDeInteresesImpuestosPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.utilidadPorcentual4.interesesPagadosPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black tracking-widest">     {dato.utilidadPorcentual5.UtilidadGravablePorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.utilidadPorcentual6.impuestosPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">     {dato.utilidadPorcentual7.UtilidadNetaPorcentual.toFixed(1)}</p>
                        </div>
                    </div>
                    <div class="flex flex-row mb-2">
                        <div class="flex flex-col justify-center w-[50%] p-2 text-lg">
                            <p class="ml-10 text-start">Dividendos </p>
                            <p class="ml-10">Adición a utilidades retenidas</p>
                        </div>
                        <div class="flex flex-col justify-center items-start w-[50%] py-2">
                            <p class="text-lg font-light text-black">{dato.utilidadPorcentual8.dividendosPorcentual.toFixed(1)}</p>
                            <p class="text-lg font-light text-black">{dato.utilidadPorcentual9.adicionUtilidadesRetenidasPorcentual.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    ));
    const Elementss = datas.map(dato => (
        <div key={dato.id} class="flex flex-col items-center w-100">
            <div class="w-[800px] h-100 flex flex-col">
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <h3>PHILIPPE CORPORATION Balances de 2008 y 2009<hr></hr> (en millones de dólares)</h3>
                </div>
                <div class="bg-gray-200 text-end p-2 border border-gray-400 text-lg">
                    <p class="mr-5"> 2008 &nbsp;</p>
                </div>
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <p> Activos</p>
                </div>
                <div class="flex flex-col  border border-gray-400">
                    <div class="flex flex-row">
                        <div class="flex flex-col justify-center items-start w-[50%] p-5 text-lg">
                            <p>Activos circulantes</p>
                            <div class="ml-10">
                                <p>Efectivo</p>
                                <p>Cuentas por cobrar</p>
                                <p>Inventario</p>
                            </div>
                            <div class="ml-20">
                                <p>Total</p>
                            </div>
                            <p>Activos fijos</p>
                            <div class="ml-10">
                                <p>Planta y equipo netos </p>
                            </div>
                            <p>Activos totales </p>
                        </div >
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black tracking-widest"> $&nbsp;&nbsp;&nbsp;{dato.act1.activosCirculantes.efectivo}</p>
                            <p class="text-lg font-light text-black">{dato.act1.activosCirculantes.cuentasPorCobrar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dato.act1.activosCirculantes.inventario}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.act1.activosCirculantes.total}</p>
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">$  &nbsp;  {dato.act1.activosCirculantes.plantaEquiposNetos}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.act2.activosTotales.sumaTotal}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <p> Pasivos y capital de los propietarios</p>
                </div>
                <div class="flex flex-col  border border-gray-400">
                    <div class="flex flex-row">
                        <div class="flex flex-col justify-center items-start w-[50%] p-5 text-lg">
                            <p> Pasivos circulantes</p>
                            <div class="ml-10">
                                <p>Cuentas por pagar</p>
                                <p>Documentos por pagar</p>
                            </div>
                            <div class="ml-20">
                                <p>Total</p>
                            </div>
                            <p> Deuda a largo plazo</p>
                            <p>  Capital de los propietarios</p>
                            <div class="ml-10">
                                <p>Acciones comunes y superávit pagado </p>
                                <p>Utilidades retenidas</p>
                            </div>
                            <div class="ml-20">
                                <p>Total</p>
                            </div>
                            <p> Total pasivos y capital contable</p>
                        </div >
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black tracking-widest"> $&nbsp;&nbsp;&nbsp;{dato.pas1.pasivosCirculantes.cuentasPorPagar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">&nbsp;&nbsp;&nbsp; &nbsp;{dato.pas1.pasivosCirculantes.pagaresPorPagar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">$ &nbsp;&nbsp;{dato.pas1.pasivosCirculantes.total}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.pas1.pasivosCirculantes.deudaLargoPlazo}</p>
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black">$  &nbsp;  {dato.pas1.pasivosCirculantes.accionesComunesSuperavitPagado}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">&nbsp;&nbsp;{dato.pas1.pasivosCirculantes.utilidadesRetenidas}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">${dato.pas2.capitalPropietarios.total}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.pas3.totalPasivosCapitalContable.sumaTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    const Elements2 = data2.map(dato => (
        <div key={dato.id} class="flex flex-col items-center justify-center w-100">
            <div class="w-[180px] h-100 flex flex-col">
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg h-[75px] ">
                <h3>&nbsp;<hr></hr></h3>
                </div>
                <div class="bg-gray-200 text-end p-2 border border-gray-400 text-lg flex flex-col justify-center items-center">
                    <p class="mr-5"> 2009 &nbsp;</p>
                </div>
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <p>&nbsp;</p>
                </div>
                <div class="flex flex-col  border border-gray-400">
                    <div class="flex flex-row mb-5 mt-5 justify-center items-center">
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black tracking-widest"> $&nbsp;&nbsp;&nbsp;{dato.act1.activosCirculantes.efectivo}</p>
                            <p class="text-lg font-light text-black">{dato.act1.activosCirculantes.cuentasPorCobrar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dato.act1.activosCirculantes.inventario}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.act1.activosCirculantes.total}</p>
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">$  &nbsp;  {dato.act1.activosCirculantes.plantaEquiposNetos}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.act2.activosTotales.sumaTotal}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <p>&nbsp;</p>
                </div>
                <div class="flex flex-col  border border-gray-400">
                    <div class="flex flex-row justify-center items-center mt-5 mb-4">
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black tracking-widest"> $&nbsp;&nbsp;&nbsp;{dato.pas1.pasivosCirculantes.cuentasPorPagar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">&nbsp;&nbsp;&nbsp; &nbsp;{dato.pas1.pasivosCirculantes.pagaresPorPagar}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">$ &nbsp;&nbsp;{dato.pas1.pasivosCirculantes.total}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.pas1.pasivosCirculantes.deudaLargoPlazo}</p>
                            <p> &nbsp;&nbsp;</p>
                            <p class="text-lg font-light text-black">$  &nbsp;  {dato.pas1.pasivosCirculantes.accionesComunesSuperavitPagado}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">&nbsp;&nbsp;{dato.pas1.pasivosCirculantes.utilidadesRetenidas}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">${dato.pas2.capitalPropietarios.total}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.pas3.totalPasivosCapitalContable.sumaTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    const Elements3 = data3.map(dato => (
        <div key={dato.id} class="flex flex-col items-center w-100">
            <div class="w-[800px] h-100 flex flex-col m-5">
                <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                    <p> Razones Financieras</p>
                </div>
                <div class="flex flex-col border border-gray-400">
                    <div class="flex flex-row">
                        <div class="flex flex-col justify-center items-start w-[50%] p-5 text-lg">
                            <p>Razón circulante</p>
                            <p>Razón rápida</p>
                            <p>Razón del efectivo</p>
                            <p>Rotación del inventario </p>
                            <p>Rotación de cuentas por cobrar</p>
                            <p>Días de ventas en inventario</p>
                            <p>Días de ventas en cuentas por cobrar</p>
                            <p>Razón de deuda total </p>
                            <p>Razón de deuda a largo plazo </p>
                            <p>Razón de veces que se ha ganado interés</p>
                            <p>Razón de cobertura de efectivo</p>
                        </div>
                        <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                            <p class="text-lg font-light text-black tracking-widest">{dato.razonCirculante.razon1.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.razonRapida.razon2.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.razonDelEfectivo.razon3.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.rotacionInventario.razon4.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.rotacionCuentasPorCobrar.razon5.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.diasVentasInventario.razon6.razon.toFixed(2)} días</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.diasVentasCuentasCobrar.razon7.razon.toFixed(2)} días</p>
                            <p class="text-lg font-light text-black tracking-widest">{Math.floor(dato.razonDeudaTotal.razon8.razon * 100)} %</p>
                            <p class="text-lg font-light text-black tracking-widest">{Math.floor(dato.razonDeudaLargoPlazo.razon9.razon * 100)} %</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.razonVecesGanadoInteres.razon10.razon.toFixed(2)} veces</p>
                            <p class="text-lg font-light text-black tracking-widest">{dato.razonCoberturaEfectivo.razon11.razon.toFixed(2)} veces</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    const Elements4 = data4.map(dato=>(
        <div class="flex flex-col items-center justify-center w-100">
        <div class="w-[180px] h-100 flex flex-col">
            <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg h-[75px] ">
                <h3>&nbsp;<hr></hr></h3>
            </div>
            <div class="bg-gray-200 text-end p-2 border border-gray-400 text-lg flex flex-col justify-center items-center">
                <p class="mr-5"> Cambio &nbsp;</p>
            </div>
            <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                <p>&nbsp;</p>
            </div>
            <div class="flex flex-col  border border-gray-400">
                <div class="flex flex-row mb-5 mt-5 justify-center items-center">
                    <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                        <p> &nbsp;&nbsp;</p>
                        <p class="text-lg font-light text-black tracking-widest">+${dato.cambios.efectivoCambio.cambio1}</p>
                        <p class="text-lg font-light text-black">{dato.cambios.cuentasPorCobrarCambio.cambio2}</p>
                        <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.cambios.inventario.cambio3}</p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">${(Math.floor(dato.cambios.efectivoCambio.cambio1 + 
                            dato.cambios.cuentasPorCobrarCambio.cambio2 + dato.cambios.inventario.cambio3 ))} </p>
                        <p> &nbsp;&nbsp;</p>
                        <p class="text-lg font-light text-black border-double border-black border-b-2">+${dato.cambios.plantaEquiposNetos.cambio5}</p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">+${(Math.floor(dato.cambios.efectivoCambio.cambio1 + 
                            dato.cambios.cuentasPorCobrarCambio.cambio2 + dato.cambios.inventario.cambio3 + dato.cambios.plantaEquiposNetos.cambio5))}</p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-200 text-center p-2 border border-gray-400 text-lg">
                <p>&nbsp;</p>
            </div>
            <div class="flex flex-col  border border-gray-400">
                <div class="flex flex-row justify-center items-center mt-5 mb-4">
                    <div class="flex flex-col justify-center items-end w-[50%] pr-5">
                        <p> &nbsp;&nbsp;</p>
                        <p class="text-lg font-light text-black tracking-widest">+${dato.cambios.cuentasPorPagar.cambio7}</p>
                        <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.cambios.pagaresPorPagar.cambio8}</p>
                        <p class="text-lg font-light text-black border-double border-black border-b-2">${(Math.floor(dato.cambios.cuentasPorPagar.cambio7 + dato.cambios.pagaresPorPagar.cambio8))} </p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">+${dato.cambios.deudaLargoPlazo.cambio10}</p>
                        <p> &nbsp;&nbsp;</p>
                        <p class="text-lg font-light text-black">+${dato.cambios.accionesComunesSuperavitPagado.cambio11}</p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">+{dato.cambios.utilidadesRetenidas.cambio12}</p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">+${(Math.floor(dato.cambios.accionesComunesSuperavitPagado.cambio11+dato.cambios.utilidadesRetenidas.cambio12))}</p>
                        <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2"> +${(Math.floor(dato.cambios.accionesComunesSuperavitPagado.cambio11+dato.cambios.utilidadesRetenidas.cambio12+
                            dato.cambios.deudaLargoPlazo.cambio10+dato.cambios.cuentasPorPagar.cambio7 + dato.cambios.pagaresPorPagar.cambio8
                        ))}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ));
    const Elements5 = data5.map(dato=>(
        <div key={dato.id}>
             <p>{dato.roe.valor.toFixed(1)} (%)</p>
        </div>
    ));
    return (
        <div>
            <Header />
            <h1 class="text-2xl font-bold m-4">SOLUCION FINANZAS CORPORATIVAS</h1>
            <p class="m-4"> <b>Orígenes y aplicaciones del efectivo: </b>   Las respuestas se anotan en la siguiente tabla. Recuerde que los incrementos en activos y
                las disminuciones en pasivos indican que se gastó algo de efectivo. Las disminuciones en
                activos y los incrementos en pasivos son una forma de obtener efectivo.
                Philippe utilizó su efectivo sobre todo para comprar activos fijos y pagar deuda a corto
                plazo. Los principales orígenes de efectivo para hacer eso fueron préstamos adicionales de
                largo plazo, reducción en activos circulantes y adiciones a las utilidades retenidas.</p>
            <div class="flex flex-row items-center justify-center w-100">
                <div>
                    <p>{Elementss}</p>
                </div>
                <div>
                    <p>{Elements2}</p>
                </div>
                <div>
                    <p>{Elements4} </p>
                </div>
            </div>
            <p class="m-4">La razón circulante cambió de 1 072 dólares/1 992 = .56 a 853 dólares/1 725 = .49, así que
                la liquidez de la empresa se redujo un tanto. Sin embargo, en general la cantidad de efectivo
                disponible aumentó 5 dólares.</p>
            <p class="m-4"><b>Estados financieros porcentuales:</b>  Aquí se ha calculado el estado de resultados en términos porcentuales. Recuerde que tan
                sólo se divide cada partida entre las ventas totales.</p>
            <div>
                <p>{Elements} </p>
            </div>
            <p class="m-4">La utilidad neta es 3.6% de las ventas. Debido a que éste es el porcentaje de cada dólar
                de ventas que va al renglón base, la utilidad neta estandarizada es el margen de utilidad de la
                empresa. El costo de ventas es 68.6 por ciento.</p>
            <p class="m-4"><b> Razones financieras:</b> Se han calculado las siguientes razones a partir de las cifras finales. Si usted no recuerda
                una definición, refiérase a la tabla 3.8. disponible en el libro para la consulta y definicion.</p>
                <div>
                    {Elements3}
                </div>
            <p class="m-4"><b>El ROE y la identidad Du Pont:</b> El rendimiento sobre el capital es la razón entre la utilidad neta y el capital total. En el caso
                de Philippe, es 146 dólares/3 347 dólares = 4.4%, que no es algo notable.
                Dada la identidad Du Pont, el ROE se puede escribir como:</p>
                <p class="m-4">ROE = Margen de utilidad × rotación de activos totales × multiplicador del capital</p>
                <div class="m-4 text-center flex flex-row items-center justify-center">
                    =&nbsp;&nbsp;{Elements5}
                </div>
            <p class="m-4">Observe que el rendimiento sobre los activos (ROA) es 3.6% × .549 = 1.98%.</p>
        </div>
    )
}
export default Solucion;
