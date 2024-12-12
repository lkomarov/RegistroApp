import { showAlert } from "../tools/message-functions";

export class Asistencia {

  static jsonAsistenciaExample =
 `{
  "bloqueInicio": "7",
  "bloqueTermino": "9",
  "dia": "2022-08-09",
  "horaFin": "15:15",
  "horaInicio": "13:00",
  "idAsignatura": "PGY4121",
  "nombreAsignatura": "Aplicaciones Móviles",
  "nombreProfesor": "Cristián Gómez Vega",
  "seccion": "001D",
  "sede": "Alonso Ovalle"
}`;

  static jsonAsistenciaEmpty =
  `{
    "bloqueInicio": "",
    "bloqueTermino": "",
    "dia": "",
    "horaFin": "",
    "horaInicio": "",
    "idAsignatura": "",
    "nombreAsignatura": "",
    "nombreProfesor": "",
    "seccion": "",
    "sede": ""
  }`;

  bloqueInicio = 0;
  bloqueTermino = 0;
  dia = '';
  horaFin = '';
  horaInicio = '';
  idAsignatura = '';
  nombreAsignatura = '';
  nombreProfesor = '';
  seccion = '';
  sede = '';

  constructor() { }

  public static getNewasistencia(
    bloqueInicio: number,
    bloqueTermino: number,
    dia: string,
    horaFin: string,
    horaInicio: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string
  ) {
    const asi = new Asistencia();
    asi.bloqueInicio = bloqueInicio;
    asi.bloqueTermino = bloqueTermino;
    asi.dia = dia;
    asi.horaFin = horaFin;
    asi.horaInicio = horaInicio;
    asi.idAsignatura = idAsignatura;
    asi.nombreAsignatura = nombreAsignatura;
    asi.nombreProfesor = nombreProfesor;
    asi.seccion = seccion;
    asi.sede = sede;
    return asi;
  }
  public static obtenerAsistenciaDesdeQR(qr: string): Asistencia {
    if (this.isvalidasistenciaQrCode(qr)) {
      const jsonData = JSON.parse(qr);

      // Usa `getNewasistencia` para crear un objeto Asistencia con los valores JSON parseados
      return this.getNewasistencia(
        Number(jsonData.bloqueInicio),
        Number(jsonData.bloqueTermino),
        jsonData.dia,
        jsonData.horaFin,
        jsonData.horaInicio,
        jsonData.idAsignatura,
        jsonData.nombreAsignatura,
        jsonData.nombreProfesor,
        jsonData.seccion,
        jsonData.sede
      );
    }
    return new Asistencia();
  }


  static isvalidasistenciaQrCode(qr: string) {
    if (qr === '') return false;

    try {
      const json = JSON.parse(qr);

      // Verifica que todos los campos requeridos estén presentes
      if (
        json.bloqueInicio !== undefined &&
        json.bloqueTermino !== undefined &&
        json.dia !== undefined &&
        json.horaFin !== undefined &&
        json.horaInicio !== undefined &&
        json.idAsignatura !== undefined &&
        json.nombreAsignatura !== undefined &&
        json.nombreProfesor !== undefined &&
        json.seccion !== undefined &&
        json.sede !== undefined
      ) {
        console.log("Código QR válido."); // Log de validación exitosa
        return true; // Si todos los campos requeridos están presentes
      }
    } catch (error) {
      console.error("Error al parsear el QR: ", error);
    }

    showAlert('El código QR escaneado no corresponde al de Asistencia');
    return false;  // Si no pasa la validación
  }
}
