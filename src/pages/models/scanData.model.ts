export class ScanData {
    info: string;
    tipo: string;
    
    contructor(tipoArchivo: string){
        this.tipo = tipoArchivo;
    }
}