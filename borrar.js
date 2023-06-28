
const handleSaveAudit = async (userInfo, navigation) => {
    const idAuditoria = generateUIDD()
    const idPromocion = await AsyncStorage.getItem("idPromocion");
    let idPreciador = await AsyncStorage.getItem("id_preciador");
    let idPercha = await AsyncStorage.getItem("id_percha");
    let idSucursal = await AsyncStorage.getItem("id_sucursal");
    let idCliente = await AsyncStorage.getItem("id_cliente");
    let nombreCliente = await AsyncStorage.getItem("nombre_cliente");
    let nombreSucursal = await AsyncStorage.getItem("nombre_sucursal");
    let idGroupClient = await AsyncStorage.getItem("idGroupClient");
    let idPortafolioAuditoria = await AsyncStorage.getItem(
        "id_portafolio_auditoria"
    );
    let dataSave = {
        tableName: "auditoria",
        dataInsertType: [
            "id_auditoria",
            "id_preciador",
            "id_percha",
            "id_promocion",
            "id_sucursal",
            "id_cliente",
            "id_grupo_cliente",
            "id_portafolio_auditoria",
            "usuario_creacion",
            "fecha_creacion",
            "nombre_cliente",
            "nombre_sucursal",
            "sincronizada",
        ],
        dataInsert: [
            `'${idAuditoria}'`,
            idPreciador ? `'${idPreciador}'` : null,
            idPercha ? `'${idPercha}'` : null,
            idPromocion ? `'${idPromocion}'` : null,
            idSucursal ? `'${idSucursal}'` : null,
            idCliente ? `'${idCliente}'` : null,
            idGroupClient ? `'${idGroupClient}'` : null,
            idPortafolioAuditoria ? `'${idPortafolioAuditoria}'` : null,
            `'${userInfo.mail}'`,
            `'${transfromrActualDateFormat(dataTime(), "F")}'`,
            `'${nombreCliente}'`,
            `'${nombreSucursal}'`,
            `${parseInt(0)}`,
        ],
    };
    try {
        db_insertGlobalDataAudit(dataSave);
        if (isConnectionActivate) {
            try {
                await subidaBaseRemoteTodaAuditoria(
                    idAuditoria,
                    () => { },
                    setGlobalVariable,
                    globalVariable
                );
                navigation.navigate("begin");
            } catch (e) {
                navigation.navigate("begin");
            }
        } else {
            navigation.navigate("begin");
        }
    } catch (e) {
        //console.log(e)
    }
};