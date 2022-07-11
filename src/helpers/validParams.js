const helpersValidParams = {}

helpersValidParams.valid = (data) => {
    const estadoVacio = data.includes("")
    const estadoNulo = data.includes(null)
    const estadoUndefined = data.includes(undefined)
    const resultadoIncludes = [estadoVacio, estadoNulo, estadoUndefined].includes(true)
    return resultadoIncludes
}

module.exports = helpersValidParams