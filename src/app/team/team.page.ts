import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage {
  itemName: string = '';
  itemQuantity: number = 0;
  dailyData: { date: string; data: any[] }[] = [];

  constructor() {
    // Cargar datos almacenados previamente
    const storedData = localStorage.getItem('inventoryData');
    if (storedData) {
      this.dailyData = JSON.parse(storedData);
    }
  }

  agregarItem() {
    if (this.itemName.trim() !== '' && this.itemQuantity > 0) {
      // Obtener la fecha actual en formato YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];

      // Buscar el registro para la fecha actual o crear uno nuevo
      const existingRecord = this.dailyData.find((record) => record.date === currentDate);

      if (existingRecord) {
        existingRecord.data.push({ name: this.itemName, quantity: this.itemQuantity });
      } else {
        this.dailyData.push({ date: currentDate, data: [{ name: this.itemName, quantity: this.itemQuantity }] });
      }

      // Limpiar los campos después de agregar un elemento
      this.itemName = '';
      this.itemQuantity = 0;

      // Guardar los datos actualizados en localStorage
      localStorage.setItem('inventoryData', JSON.stringify(this.dailyData));
    }
  }

  modificarCantidad(item: any) {
    const newQuantity = prompt(`Modificar cantidad para ${item.name}:`, item.quantity);
    if (newQuantity !== null) {
      const parsedQuantity = parseFloat(newQuantity);
      if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
        item.quantity = parsedQuantity;
        // Actualizar los datos en localStorage después de la modificación
        localStorage.setItem('inventoryData', JSON.stringify(this.dailyData));
      } else {
        alert('Por favor, ingrese una cantidad válida mayor o igual a 0.');
      }
    }
  }

  descargarTexto() {
    // Crear un archivo de texto con la información de los datos actuales
    const textData = [];

    this.dailyData.forEach((day) => {
      textData.push('Fecha: ' + day.date);
      day.data.forEach((item) => {
        textData.push('Item: ' + item.name);
        textData.push('Cantidad: ' + item.quantity);
        textData.push('');
      });
    });

    const blob = new Blob(textData, { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'registro_inventario.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
