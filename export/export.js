(function () {

function download(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();

    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

window.exportOBJ = function () {

    const ext = window.__WebGLExtractor;

    if (!ext) {
        alert("WebGLExtractor no encontrado");
        return;
    }

    if (!ext.drawCalls.length) {
        alert("No hay drawCalls");
        return;
    }

    const draw = ext.drawCalls[0];

    const positionInfo = draw.attributes[0];

    if (!positionInfo) {
        alert("No existe atributo posición");
        return;
    }

    const vertexBuffer =
        ext.buffers[positionInfo.buffer];

    const indexBuffer =
        ext.buffers[draw.indexBuffer];

    if (!vertexBuffer || !indexBuffer) {
        alert("Buffers no encontrados");
        return;
    }

    const vertices =
        new Float32Array(vertexBuffer.data);

    const indices =
        new Uint32Array(indexBuffer.data);

    console.log("Vertices:", vertices.length / 3);
    console.log("Indices:", indices.length);

    let obj = "";

    //----------------------------------
    // VERTICES
    //----------------------------------

    for (let i = 0; i < vertices.length; i += 3) {

        obj +=
            "v " +
            vertices[i] + " " +
            vertices[i + 1] + " " +
            vertices[i + 2] + "\n";

    }

    //----------------------------------
    // CARAS
    //----------------------------------

    for (let i = 0; i < indices.length; i += 3) {

        obj +=
            "f " +
            (indices[i] + 1) + " " +
            (indices[i + 1] + 1) + " " +
            (indices[i + 2] + 1) +
            "\n";

    }

    console.log("OBJ generado");

    download("modelo.obj", obj);

};

})();
