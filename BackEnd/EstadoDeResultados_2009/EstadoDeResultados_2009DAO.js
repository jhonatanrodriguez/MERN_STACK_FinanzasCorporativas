const mongoose = require('mongoose');
require('../dbconfig/dbFile');
async function EstadoDeResultados(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.find();
    done(undefined, data);
}//metodo para calcular el estado de resultados y su forma porcentual
async function DeclaracionIngresos(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.aggregate([
        {
            $facet:
            {
                "utilidad1":
                    [{
                        $project: {
                            UtilidadAntesDeInteresesImpuestos:
                            {
                                $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }]
                            }, _id: 0, ventas: 1, costoDeVentas: 1, depreciacion: 1, interesesPagados: 1,
                            impuestos: 1, depreciacion: 1, dividendos: 1, adicionUtilidadesRetenidas: 1
                        }
                    }],
                "utilidad2":
                    [{
                        $project: {
                            UtilidadGravable:
                            {
                                $subtract: [{ $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }] },
                                    "$interesesPagados"]
                            }, _id: 0
                        }
                    }],
                "utilidad3":
                    [{
                        $project: {
                            UtilidadNeta:
                            {
                                $subtract: [{
                                    $subtract: [{ $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }] },
                                        "$interesesPagados"]
                                }, "$impuestos"]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual1":
                    [{
                        $project: {
                            costoDeVentasPorcentual:
                            {
                                $multiply: [{ $divide: ["$costoDeVentas", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual2":
                    [{
                        $project: {
                            depreciacionPorcentual:
                            {
                                $multiply: [{ $divide: ["$depreciacion", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual3":
                    [{
                        $project: {
                            UtilidadAntesDeInteresesImpuestosPorcentual:
                            {
                                $multiply: [{
                                    $divide: [{ $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }] },
                                        "$ventas"]
                                }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual4":
                    [{
                        $project: {
                            interesesPagadosPorcentual:
                            {
                                $multiply: [{ $divide: ["$interesesPagados", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual5":
                    [{
                        $project: {
                            UtilidadGravablePorcentual:
                            {
                                $multiply: [{
                                    $divide: [{
                                        $subtract: [{ $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }] },
                                            "$interesesPagados"]
                                    }, "$ventas"]
                                }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual6":
                    [{
                        $project: {
                            impuestosPorcentual:
                            {
                                $multiply: [{ $divide: ["$impuestos", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual7":
                    [{
                        $project: {
                            UtilidadNetaPorcentual:
                            {
                                $multiply: [{
                                    $divide: [{
                                        $subtract: [{
                                            $subtract: [{ $subtract: ["$ventas", { $add: ["$costoDeVentas", "$depreciacion"] }] },
                                                "$interesesPagados"]
                                        }, "$impuestos"]
                                    }, "$ventas"]
                                }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual8":
                    [{
                        $project: {
                            dividendosPorcentual:
                            {
                                $multiply: [{ $divide: ["$dividendos", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }],
                "utilidadPorcentual9":
                    [{
                        $project: {
                            adicionUtilidadesRetenidasPorcentual:
                            {
                                $multiply: [{ $divide: ["$adicionUtilidadesRetenidas", "$ventas"] }, 100]
                            }, _id: 0
                        }
                    }]
            }
        },
        { $unwind: { path: "$utilidad1", includeArrayIndex: "arrayIndex", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$utilidad2", includeArrayIndex: "arrayIndex", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$utilidad3", includeArrayIndex: "arrayIndex", preserveNullAndEmptyArrays: true } },
        { $unwind: "$utilidadPorcentual1" }, { $unwind: "$utilidadPorcentual2" }, { $unwind: "$utilidadPorcentual3" },
        { $unwind: "$utilidadPorcentual4" }, { $unwind: "$utilidadPorcentual5" }, { $unwind: "$utilidadPorcentual6" },
        { $unwind: "$utilidadPorcentual7" }, { $unwind: "$utilidadPorcentual8" }, { $unwind: "$utilidadPorcentual9" }
    ]);
    done(undefined, data)
};
//metodo para calcular el balance generaldel año 2008
async function activosDos(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.aggregate([
        {
            $facet: {
                "act1":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                { $match :
                                    { $expr :
                                       [
                                         { $eq: [ "$balanceAnterior.año", "2008" ] }
                                       ]
                                    }
                                 },
                                {
                                    $project: {
                                        total: {
                                            $add: ["$balanceAnterior.efectivo", { $add: ["$balanceAnterior.cuentasPorCobrar", "$balanceAnterior.inventario"] }]
                                        }, _id: 0, efectivo:"$balanceAnterior.efectivo", cuentasPorCobrar:"$balanceAnterior.cuentasPorCobrar",
                                         inventario: "$balanceAnterior.inventario", plantaEquiposNetos: "$balanceAnterior.plantaEquiposNetos"
                                    }
                                }
                            ],
                            as: "activosCirculantes"
                        }
                    }, { $unwind: "$activosCirculantes" }, { $project: { activosCirculantes: 1, _id: 0 } }
                    ],
                "act2":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        sumaTotal: {
                                            $let: {
                                                vars: {
                                                    total: {
                                                        $add: ["$balanceAnterior.efectivo", { $add: ["$balanceAnterior.cuentasPorCobrar", "$balanceAnterior.inventario"] }]
                                                    }
                                                },
                                                in: {
                                                    $add: ["$balanceAnterior.plantaEquiposNetos", "$$total"]
                                                }
                                            }
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "activosTotales"
                        }
                    },
                    { $unwind: "$activosTotales" }, { $project: { activosTotales: 1, _id: 0 } }
                    ],
                "pas1":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        total: {
                                            $add: ["$balanceAnterior.pagaresPorPagar", "$balanceAnterior.cuentasPorPagar"]
                                        }, _id: 0, cuentasPorPagar: "$balanceAnterior.cuentasPorPagar", pagaresPorPagar: "$balanceAnterior.pagaresPorPagar",
                                         deudaLargoPlazo: "$balanceAnterior.deudaLargoPlazo", accionesComunesSuperavitPagado: "$balanceAnterior.accionesComunesSuperavitPagado",
                                         utilidadesRetenidas: "$balanceAnterior.utilidadesRetenidas",
                                    }
                                }
                            ],
                            as: "pasivosCirculantes"
                        }
                    }, { $unwind: "$pasivosCirculantes" }, { $project: { pasivosCirculantes: 1, _id: 0 } }
                    ],
                "pas2":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        total: {
                                            $add: ["$balanceAnterior.utilidadesRetenidas", "$balanceAnterior.accionesComunesSuperavitPagado"]
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "capitalPropietarios"
                        }
                    }, { $unwind: "$capitalPropietarios" }, { $project: { capitalPropietarios: 1, _id: 0 } }
                    ],
                "pas3":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        sumaTotal: {
                                            $let: {
                                                vars: {
                                                    pasivosCirculantes: {
                                                        $add: ["$balanceAnterior.cuentasPorPagar", { $add: ["$balanceAnterior.pagaresPorPagar", "$balanceAnterior.deudaLargoPlazo"] }]
                                                    },
                                                    capitalPropietarios: {
                                                        $add: ["$balanceAnterior.accionesComunesSuperavitPagado", "$balanceAnterior.utilidadesRetenidas"]
                                                    }
                                                },
                                                in: {
                                                    $add: ["$$pasivosCirculantes", "$$capitalPropietarios"]
                                                }
                                            }
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "totalPasivosCapitalContable"
                        }
                    },
                    { $unwind: "$totalPasivosCapitalContable" }, { $project: { totalPasivosCapitalContable: 1, _id: 0 } }
                    ]
            }
        },
        { $unwind: "$act1" },{ $unwind: "$act2" },{ $unwind: "$pas1" },{ $unwind: "$pas2" },{ $unwind: "$pas3" }
    ]);
    done(undefined, data)
};
//metodo para calcular el balance generaldel año 2009
async function activos(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.aggregate([
        {
            $facet: {
                "act1":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        total: {
                                            $add: ["$efectivo", { $add: ["$cuentasPorCobrar", "$inventario"] }]
                                        }, _id: 0, efectivo: 1, cuentasPorCobrar: 1, inventario: 1, plantaEquiposNetos: 1
                                    }
                                }
                            ],
                            as: "activosCirculantes"
                        }
                    }, { $unwind: "$activosCirculantes" }, { $project: { activosCirculantes: 1, _id: 0 } }
                    ],
                "act2":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        sumaTotal: {
                                            $let: {
                                                vars: {
                                                    total: {
                                                        $add: ["$efectivo", { $add: ["$cuentasPorCobrar", "$inventario"] }]
                                                    }
                                                },
                                                in: {
                                                    $add: ["$plantaEquiposNetos", "$$total"]
                                                }
                                            }
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "activosTotales"
                        }
                    },
                    { $unwind: "$activosTotales" }, { $project: { activosTotales: 1, _id: 0 } }
                    ],
                "pas1":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        total: {
                                            $add: ["$pagaresPorPagar", "$cuentasPorPagar"]
                                        }, _id: 0, cuentasPorPagar: 1, pagaresPorPagar: 1, deudaLargoPlazo: 1,
                                        accionesComunesSuperavitPagado: 1, utilidadesRetenidas: 1,
                                    }
                                }
                            ],
                            as: "pasivosCirculantes"
                        }
                    }, { $unwind: "$pasivosCirculantes" }, { $project: { pasivosCirculantes: 1, _id: 0 } }
                    ],
                "pas2":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        total: {
                                            $add: ["$utilidadesRetenidas", "$accionesComunesSuperavitPagado"]
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "capitalPropietarios"
                        }
                    }, { $unwind: "$capitalPropietarios" }, { $project: { capitalPropietarios: 1, _id: 0 } }
                    ],
                "pas3":
                    [{
                        $lookup:
                        {
                            from: "balancegeneral_2009",
                            pipeline: [
                                {
                                    $project: {
                                        sumaTotal: {
                                            $let: {
                                                vars: {
                                                    pasivosCirculantes: {
                                                        $add: ["$cuentasPorPagar", { $add: ["$pagaresPorPagar", "$deudaLargoPlazo"] }]
                                                    },
                                                    capitalPropietarios: {
                                                        $add: ["$accionesComunesSuperavitPagado", "$utilidadesRetenidas"]
                                                    }
                                                },
                                                in: {
                                                    $add: ["$$pasivosCirculantes", "$$capitalPropietarios"]
                                                }
                                            }
                                        }, _id: 0
                                    }
                                }
                            ],
                            as: "totalPasivosCapitalContable"
                        }
                    },
                    { $unwind: "$totalPasivosCapitalContable" }, { $project: { totalPasivosCapitalContable: 1, _id: 0 } }
                    ]
            }
        },
        { $unwind: "$act1" }, { $unwind: "$act2" }, { $unwind: "$pas1" }, { $unwind: "$pas2" }, { $unwind: "$pas3" }
    ]);
    done(undefined, data)
};
//metodo para calcular el cambio entre los balances del año 2008 y el año 2009
async function getSustracion(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.aggregate([
        {
            $lookup:
            {
                from: "balancegeneral_2009", 
                pipeline:
                    [
                        {
                            $facet: 
                            {
                                "efectivoCambio": 
                                [
                                    {
                                        $project: {
                                            cambio1: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$efectivo", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.efectivo", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "cuentasPorCobrarCambio": 
                                [
                                    {
                                        $project: {
                                            cambio2: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$cuentasPorCobrar", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.cuentasPorCobrar", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "inventario": 
                                [
                                    {
                                        $project: {
                                            cambio3: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$inventario", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.inventario", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "plantaEquiposNetos": 
                                [
                                    {
                                        $project: {
                                            cambio5: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$plantaEquiposNetos", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.plantaEquiposNetos", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "cuentasPorPagar": 
                                [
                                    {
                                        $project: {
                                            cambio7: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$cuentasPorPagar", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.cuentasPorPagar", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "pagaresPorPagar": 
                                [
                                    {
                                        $project: {
                                            cambio8: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$pagaresPorPagar", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.pagaresPorPagar", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "deudaLargoPlazo": 
                                [
                                    {
                                        $project: {
                                            cambio10: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$deudaLargoPlazo", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.deudaLargoPlazo", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "accionesComunesSuperavitPagado": 
                                [
                                    {
                                        $project: {
                                            cambio11: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$accionesComunesSuperavitPagado", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.accionesComunesSuperavitPagado", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                "utilidadesRetenidas": 
                                [
                                    {
                                        $project: {
                                            cambio12: {
                                                $subtract: [{ $cond: { if: { $eq: ["$año", "2009"]
                                                        }, then: "$utilidadesRetenidas", else: 0
                                                    }
                                                },{
                                                    $cond: {
                                                        if: { $eq: ["$balanceAnterior.año", "2008"]
                                                        }, then: "$balanceAnterior.utilidadesRetenidas", else: 0
                                                    }
                                                }]
                                            }, _id: 0
                                        }
                                    }
                                ]
                            }
                        },{ $unwind: "$efectivoCambio" },{ $unwind: "$cuentasPorCobrarCambio" },{ $unwind: "$inventario" }
                        ,{ $unwind: "$plantaEquiposNetos" } ,{ $unwind: "$cuentasPorPagar" },{ $unwind: "$pagaresPorPagar" }
                        ,{ $unwind: "$deudaLargoPlazo" },{ $unwind: "$accionesComunesSuperavitPagado" },{ $unwind: "$utilidadesRetenidas" }
                        
                    ], as: "cambios"
            }
        },
        { $unwind: "$cambios" }
    ]);
    done(undefined, data)
};
//metodo para calcular las razones financieras del año 2009
async function getRazonesFinancieras(estadoDeResultados_2009, done) {
    const data = await estadoDeResultados_2009.aggregate([
        {
            $facet:
            {
                "razonCirculante":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        activosCirculantes: { $add: ["$efectivo", { $add: ["$cuentasPorCobrar", "$inventario"] }] },
                                                        pasivosCirculantes: { $add: ["$cuentasPorPagar", "$pagaresPorPagar"] }
                                                    },
                                                    in: {
                                                        $divide: ["$$activosCirculantes", "$$pasivosCirculantes"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon1",
                            }
                        }, { $unwind: "$razon1" }, { $project: { razon1: 1, _id: 0 } }
                    ],
                "razonRapida":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        activosCirculantes: { $add: ["$efectivo", { $add: ["$cuentasPorCobrar", "$inventario"] }] },
                                                        pasivosCirculantes: { $add: ["$cuentasPorPagar", "$pagaresPorPagar"] }
                                                    },
                                                    in: {
                                                        $divide: [{ $subtract: ["$$activosCirculantes", "$inventario"] }, "$$pasivosCirculantes"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon2",
                            }
                        }, { $unwind: "$razon2" }, { $project: { razon2: 1, _id: 0 } }
                    ],
                "razonDelEfectivo":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        pasivosCirculantes: { $add: ["$cuentasPorPagar", "$pagaresPorPagar"] }
                                                    },
                                                    in: {
                                                        $divide: ["$efectivo", "$$pasivosCirculantes"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon3",
                            }
                        }, { $unwind: "$razon3" }, { $project: { razon3: 1, _id: 0 } }
                    ],
                "rotacionInventario":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: { costoDeVentas: "$costoDeVentas" },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $divide: ["$$costoDeVentas", "$inventario"]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon4",
                            }
                        }, { $unwind: "$razon4" }, { $project: { razon4: 1, _id: 0 } }
                    ],
                "rotacionCuentasPorCobrar":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: { ventas: "$ventas" },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $divide: ["$$ventas", "$cuentasPorCobrar"]
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon5",
                            }
                        }, { $unwind: "$razon5" }, { $project: { razon5: 1, _id: 0 } }
                    ],
                "diasVentasInventario":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: { costoDeVentas: "$costoDeVentas" },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        razon: { $divide: ["$$costoDeVentas", "$inventario"] }
                                                    },
                                                    in: {
                                                        $divide: [365, "$$razon"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon6",
                            }
                        }, { $unwind: "$razon6" }, { $project: { razon6: 1, _id: 0 } }
                    ],
                "diasVentasCuentasCobrar":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: { ventas: "$ventas" },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        rotacionCuentasPorCobrar: { $divide: ["$$ventas", "$cuentasPorCobrar"] }
                                                    },
                                                    in: {
                                                        $divide: [365, "$$rotacionCuentasPorCobrar"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon7",
                            }
                        }, { $unwind: "$razon7" }, { $project: { razon7: 1, _id: 0 } }
                    ],
                "razonDeudaTotal":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        activosTotales: {
                                                            $add: [{ $add: ["$efectivo", { $add: ["$cuentasPorCobrar", "$inventario"] }] },
                                                                "$plantaEquiposNetos"]
                                                        },
                                                        capitalContableTotal: {
                                                            $add: ["$accionesComunesSuperavitPagado", "$utilidadesRetenidas"]
                                                        }
                                                    },
                                                    in: {
                                                        $divide: [
                                                            { $subtract: ["$$activosTotales", "$$capitalContableTotal"] }, "$$activosTotales"
                                                        ]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon8",
                            }
                        }, { $unwind: "$razon8" }, { $project: { razon8: 1, _id: 0 } }
                    ],
                "razonDeudaLargoPlazo":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        capitalContableTotal: {
                                                            $add: ["$accionesComunesSuperavitPagado", "$utilidadesRetenidas"]
                                                        }
                                                    },
                                                    in: {
                                                        $divide: ["$deudaLargoPlazo",
                                                            { $add: ["$deudaLargoPlazo", "$$capitalContableTotal"] }]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon9",
                            }
                        }, { $unwind: "$razon9" }, { $project: { razon9: 1, _id: 0 } }
                    ]
                , "razonVecesGanadoInteres":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: {
                                    ventas: "$ventas", costoDeVentas: "$costoDeVentas",
                                    depreciacion: "$depreciacion", interesesPagados: "$interesesPagados",
                                },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        utilidadAntesDeInteresesImpuestos:
                                                        {
                                                            $subtract: ["$$ventas", { $add: ["$$costoDeVentas", "$$depreciacion"] }]
                                                        }
                                                    },
                                                    in: {
                                                        $divide: ["$$utilidadAntesDeInteresesImpuestos", "$$interesesPagados"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon10",
                            }
                        }, { $unwind: "$razon10" }, { $project: { razon10: 1, _id: 0 } }
                    ],
                "razonCoberturaEfectivo":
                    [
                        {
                            $lookup: {
                                from: "balancegeneral_2009",
                                let: {
                                    ventas: "$ventas", costoDeVentas: "$costoDeVentas",
                                    depreciacion: "$depreciacion", interesesPagados: "$interesesPagados",
                                },
                                pipeline: [
                                    {
                                        $project: {
                                            razon: {
                                                $let: {
                                                    vars: {
                                                        utilidadAntesDeInteresesImpuestos:
                                                        {
                                                            $subtract: ["$$ventas", { $add: ["$$costoDeVentas", "$$depreciacion"] }]
                                                        }
                                                    },
                                                    in: {
                                                        $divide: [{ $add: ["$$utilidadAntesDeInteresesImpuestos", "$$depreciacion"] }, "$$interesesPagados"]
                                                    }
                                                }
                                            }, _id: 0
                                        }
                                    }
                                ],
                                as: "razon11",
                            }
                        }, { $unwind: "$razon11" }, { $project: { razon11: 1, _id: 0 } }
                    ]
            }
        },
        { $unwind: "$razonCirculante" }, { $unwind: "$razonRapida" }, { $unwind: "$razonDelEfectivo" },
        { $unwind: "$rotacionInventario" },{ $unwind: "$rotacionCuentasPorCobrar" }, { $unwind: "$diasVentasInventario" },
        { $unwind: "$diasVentasCuentasCobrar" },{ $unwind: "$razonDeudaTotal" }, { $unwind: "$razonDeudaLargoPlazo" },
        { $unwind: "$razonVecesGanadoInteres" },{ $unwind: "$razonCoberturaEfectivo" }
    ]);
    done(undefined, data)
};
//metodo para calcular el ROE y la identidad Du Pont
async function getROE(estadoDeResultados_2009, done){
    const data = await estadoDeResultados_2009.aggregate([
        {
            $lookup: {
                from: "balancegeneral_2009",
                let: {
                    ventas: "$ventas", costoDeVentas: "$costoDeVentas", depreciacion: "$depreciacion",
                     interesesPagados: "$interesesPagados", impuestos: "$impuestos"
                },
                pipeline: [
                    {
                        $project: {
                            valor: {
                                $let: {
                                    vars: {
                                        margenDeUtilidad: {$divide:[{$subtract:[{ $subtract: [ {$subtract:["$$ventas",
                                             {$add:["$$costoDeVentas", "$$depreciacion"] } ] },"$$interesesPagados"]} ,
                                             "$$impuestos"] } ,"$$ventas"] },
                                        rotacionActivosTotales: {$divide: [ "$$ventas",{$add:[{$add:[{$add:["$efectivo", 
                                            "$cuentasPorCobrar"]},"$inventario"]}, "$plantaEquiposNetos"]}] },
                                        multiplicadorDelCapital:{$divide:[ {$add:[{$add:[{$add:["$efectivo", "$cuentasPorCobrar"]},
                                        "$inventario"]}, "$plantaEquiposNetos"]}, {$add:["$accionesComunesSuperavitPagado", "$utilidadesRetenidas"]} ] }
                                    },
                                    in: {
                                        $multiply:[{$multiply:[{ $multiply:["$$margenDeUtilidad", "$$rotacionActivosTotales"]}, "$$multiplicadorDelCapital"]} ,100]
                                    }
                                }
                            }, _id: 0
                        }
                    }
                ],
                as: "roe",
            }
        }, { $unwind: "$roe" }, { $project: { roe: 1, _id: 0 } }
    ]);
    done(undefined, data);
}
module.exports = { EstadoDeResultados, DeclaracionIngresos, activos, activosDos, getSustracion, getRazonesFinancieras, getROE }