var Na = 0, cant = 90, ini = 10;

function Rand(x) {
  return Math.floor(Math.random() * x);
}

class nodo {
  constructor(info, pre, sig) {
    this.data = info;
    this.prev = pre;
    this.next = sig;
  }
}

class ListaCirDoble {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  AddHead(info) {
    const NewNodo = new nodo(info, this.tail, this.head);
    if (!this.head) {
      this.head = this.tail = NewNodo.prev = NewNodo.next = NewNodo;
    } else {
      this.head.prev = NewNodo;
      this.tail.next = NewNodo;
      this.head = NewNodo;
    }
    this.size++;
    console.log(`Nodo con valor ${info} agregado al inicio`);
  }

  AddTail(info) {
    const NewNodo = new nodo(info, this.tail, this.head);
    if (!this.tail) {
      this.head = this.tail = NewNodo.prev = NewNodo.next = NewNodo;
    } else {
      this.tail.next = NewNodo;
      this.head.prev = NewNodo;
      this.tail = NewNodo;
    }
    this.size++;
    console.log(`Nodo con valor ${info} agregado al final`);
  }

  AddAt(info, position) {
    if (position < 0 || position > this.size) {
      console.log("Posición fuera de los límites");
      return;
    }
    if (position === 0) {
      this.AddHead(info);
      return;
    }
    if (position === this.size) {
      this.AddTail(info);
      return;
    }

    let nodoActual = this.head;
    for (let i = 0; i < position; i++) {
      nodoActual = nodoActual.next;
    }
    const NewNodo = new nodo(info, nodoActual.prev, nodoActual);
    nodoActual.prev.next = NewNodo;
    nodoActual.prev = NewNodo;
    this.size++;
    console.log(`Nodo con valor ${info} agregado en la posición ${position}`);
  }

  DelHead() {
    if (!this.head) {
      console.log("La lista está vacía");
      return;
    }
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = this.tail;
      this.tail.next = this.head;
    }
    this.size--;
    console.log("Nodo al inicio eliminado");
  }

  DelAt(position) {
    if (position < 0 || position >= this.size) {
      console.log("Posición fuera de los límites");
      return;
    }
    if (position === 0) {
      this.DelHead();
      return;
    }
    let nodoActual = this.head;
    for (let i = 0; i < position; i++) {
      nodoActual = nodoActual.next;
    }
    nodoActual.prev.next = nodoActual.next;
    nodoActual.next.prev = nodoActual.prev;
    if (nodoActual === this.tail) {
      this.tail = nodoActual.prev;
    }
    this.size--;
    console.log(`Nodo en la posición ${position} eliminado`);
  }

  DelTail() {
    if (!this.tail) {
        console.log("La lista está vacía");
        return;
    }
    if (this.size === 1) {
        this.head = this.tail = null;
    } else {
        this.tail = this.tail.prev;
        this.tail.next = this.head;
        this.head.prev = this.tail;
    }
    this.size--;
    console.log("Nodo al final eliminado");
  }

  DelIgualA(info) {
    console.log("Ejecutando DelIgualA con info:", info); // Mensaje de depuración
    let nodoActual = this.head;
    let contador = 0;
    while (nodoActual && contador < this.size) {
        if (nodoActual.data === info) {
            this.DelAt(contador);
            return;
        }
        nodoActual = nodoActual.next;
        contador++;
    }
    console.log(`No se encontró ningún nodo con el contenido ${info}`);
 }

}

var Lista = new ListaCirDoble(); // Instanciación

function Print() {
  var n, i, k, Tx, Valor;
  document.getElementById('store').innerHTML = "";
  Valor = Lista.head;
  if (Lista.size <= 5) {
    for (k = 0; k < Lista.size; k++) {
      Tx = "<p>" + Valor.data + "<br>" + k + "</p>"; // imprime el valor del nodo y en la parte inferior imprime su posición
      document.getElementById('store').innerHTML += Tx;
      Valor = Valor.next;
    }
  } else {
    for (i = 0; i < Na; i++)
      Valor = Valor.next;
    for (k = 0; k < 5; k++) {
      n = i + k; // para imprimir la posición del nodo dentro de la lista
      if (n >= Lista.size)
        n -= Lista.size;
      Tx = "<p>" + Valor.data + "<br>" + n + "</p>"; // imprime el valor del nodo y en la parte inferior imprime su posición
      document.getElementById('store').innerHTML += Tx;
      Valor = Valor.next;
    }
  }
  Mensaje();
}

function Ant() { // para regresar un nodo en la impresión de la lista
  Na--;
  if (Na < 0)
    Na = Lista.size - 1;
  Print();
}

function Sig() { // para avanzar un nodo en la impresión de la lista
  Na++;
  if (Na >= Lista.size)
    Na = 0;
  Print();
}

function AddHead() {
  var t;
  t = Rand(cant) + ini;
  Lista.AddHead(t.toString());
  Print();
}

function AddTail() {
  var t;
  t = Rand(cant) + ini;
  Lista.AddTail(t.toString());
  Print();
}

function AddAt() {
  var position = parseInt(prompt("Ingrese la posición donde desea agregar el nodo:"));
  if (isNaN(position) || position < 0 || position > Lista.size) {
    alert("Por favor, ingrese una posición válida.");
    return;
  }
  var value = prompt("Ingrese el valor que desea agregar en la posición " + position + ":");
  if (value === null || value.trim() === "") {
    alert("Por favor, ingrese un valor válido.");
    return;
  }
  Lista.AddAt(value, position);
  Print();
}

function DelHead() {
  Lista.DelHead();
  Print();
}
function DelAt() {
  var position = parseInt(prompt("Ingrese la posición del nodo que desea eliminar:"));
  if (isNaN(position) || position < 0 || position >= Lista.size) {
    alert("Por favor, ingrese una posición válida.");
    return;
  }
  Lista.DelAt(position);
  Print();
}

function DelTail() {
  Lista.DelTail();
  Print();
}

function DelIgualA() {
  var contenido = prompt("Ingrese el contenido que desea eliminar:");
  if (contenido === null || contenido.trim() === "") {
    alert("Por favor, ingrese un contenido válido.");
    return;
  }
  Lista.DelIgualA(contenido);
  Print();
}

function Mensaje() { // Para imprimir el tamaño de la lista
  document.getElementById('Msg0').innerHTML = "Tamaño: " + Lista.size;
}

function Iniciar() {
  Mensaje();
}

window.onload = Iniciar;
s