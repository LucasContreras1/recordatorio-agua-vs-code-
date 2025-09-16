const vscode = require('vscode');

// Define el tiempo del recordatorio en milisegundos (30 minutos)
const intervaloRecordatorio = 1800000;

// Esta función mostrará la notificación
function mostrarNotificacion() {
    vscode.window.showInformationMessage('¡Es hora de beber agua! 💧', 'Ya bebí', 'Recordar más tarde')
        .then(selection => {
            if (selection === 'Ya bebí') {
                vscode.window.showInformationMessage('¡Excelente! Hidratación registrada.');
            } else if (selection === 'Recordar más tarde') {
                vscode.window.showInformationMessage('Recordatorio pospuesto por 15 minutos.');
            }
        });
}

function activate(context) {
    console.log('Tu extensión de recordatorio de agua ya está activa!');

    // Inicia el recordatorio automático cada 30 minutos
    const recordatorioAutomatico = setInterval(mostrarNotificacion, intervaloRecordatorio);

    // Registra el comando manual para ejecutarlo cuando quieras
    let disposable = vscode.commands.registerCommand('extension.recordatorioAgua', function () {
        mostrarNotificacion();
    });

    context.subscriptions.push(disposable);
    
    // Almacena el ID del intervalo para poder detenerlo más tarde
    context.subscriptions.push({
        dispose: () => clearInterval(recordatorioAutomatico)
    });
}

function deactivate() {
    // Aquí puedes limpiar recursos si es necesario
}

module.exports = {
    activate,
    deactivate
}