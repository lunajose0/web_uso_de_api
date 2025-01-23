const usdPriceInput = document.getElementById('usdPrice');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const fechaActualizacion = document.getElementById('fecha-actualizacion');

calculateBtn.addEventListener('click', () => {
    const usdPrice = parseFloat(usdPriceInput.value);
    fechaActualizacion.textContent ="";

    if (isNaN(usdPrice) || usdPrice <= 0) {
        resultDiv.textContent = "Por favor, ingrese un precio válido.";
        return;
    }

    fetch('https://uy.dolarapi.com/v1/cotizaciones/usd')
        .then(response => response.json())
        .then(data => {
            if (data && data.compra && data.venta) {
                const cotizacion = parseFloat(data.venta);
                const precioEnPesos = usdPrice * cotizacion;
                resultDiv.textContent = `El precio en pesos uruguayos es: $${precioEnPesos.toFixed(2)}`;
                fechaActualizacion.textContent = `Cotización actualizada al: ${data.fechaActualizacion}`;
            } else {
                resultDiv.textContent = "No se pudo obtener la cotización actual.";
            }
           
        })
        .catch(error => {
            console.error("Error al obtener la cotización:", error);
            resultDiv.textContent = "Ocurrió un error al obtener la cotización.";
        });
});