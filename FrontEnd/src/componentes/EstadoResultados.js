import { useState, useEffect } from 'react';
import Header from './Header';
function EstadoResultados() {
    const [datas, setDatas] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const fechtData = async () => {
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
            const response = await fetch('http://localhost:3000/ing');
            const result = await response.json();
            setData3(result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fechtData();
        fechtData2();
        fechtData3();
    }, []);
    const Elements = datas.map(dato => (
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
                    <h3> PHILIPPE CORPORATION Balances de 2008 y 2009 <hr></hr> (en millones de dólares)</h3>
                </div>
                <div class="flex flex-col  border border-gray-400">
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
                            <p class="text-lg font-light text-black tracking-widest"> ${dato.utilidad1.ventas}</p>
                            <p class="text-lg font-light text-black">{dato.utilidad1.costoDeVentas}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2 ">{dato.utilidad1.depreciacion}</p>
                            <p class="text-lg font-light text-black tracking-widest">$    {dato.utilidad1.UtilidadAntesDeInteresesImpuestos}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.utilidad1.interesesPagados}</p>
                            <p class="text-lg font-light text-black tracking-widest">$    {dato.utilidad2.UtilidadGravable}</p>
                            <p class="text-lg font-light text-black border-double border-black border-b-2">{dato.utilidad1.impuestos}</p>
                            <p class="text-lg font-light text-black tracking-widest border-double border-black border-b-2">$    {dato.utilidad3.UtilidadNeta}</p>
                        </div>
                    </div>
                    <div class="flex flex-row mb-2">
                        <div class="flex flex-col justify-center w-[50%] p-2 text-lg">
                            <p class="ml-10 text-start">Dividendos </p>
                            <p class="ml-10">Adición a utilidades retenidas</p>
                        </div>
                        <div class="flex flex-col justify-center items-start w-[50%] py-2">
                            <p class="text-lg font-light text-black">${dato.utilidad1.dividendos}</p>
                            <p class="text-lg font-light text-black">{dato.utilidad1.adicionUtilidadesRetenidas}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <div>
            <Header />
            <div class="flex flex-col items-start w-100">
                <h1 class="text-2xl font-bold m-4">FINANZAS CORPORATIVAS</h1>
                <p class="m-4"> <b>Orígenes y aplicaciones del efectivo: </b> Considere los siguientes balances de Philippe Cor
                    poration. Calcule los cambios en las diversas cuentas y, donde proceda, identifique el cam
                    bio como un origen o una aplicación del efectivo. ¿Cuáles fueron los principales orígenes y
                    aplicaciones del efectivo? ¿La empresa se volvió más o menos líquida durante el año? ¿Qué
                    le ocurrió al efectivo durante el año?</p>
            </div>
            <div class="flex flex-row items-center justify-center w-100">
                <div>
                    <p>{Elements}</p>
                </div>
                <div>
                    <p>{Elements2}</p>
                </div>
            </div>

            <p class="m-4"><b>Estados financieros porcentuales:</b> A continuación aparecen los estados financieros más
                recientes de Philippe. Prepare un estado de resultados en términos porcentuales a partir de
                esta información. ¿Cómo interpreta la utilidad neta estandarizada? ¿Qué porcentaje de las
                ventas va al costo de los bienes vendidos?</p>
                <div>
                <p>{Elements3}</p>
                </div>

            <p class="m-4"><b> Razones financieras:</b> Con base en los balances y el estado de resultados de los dos proble
                mas anteriores, calcule las siguientes razones para 2009: todas las seleccionadas y muestrelas en tablas.</p>
            <p class="m-4"><b>   El ROE y la identidad Du Pont:</b> Calcule el ROE de 2009 para Philippe Corporation y des
                pués desglose su respuesta en las partes que la componen mediante la identidad Du Pont.</p>

        </div>
    )
}
export default EstadoResultados;