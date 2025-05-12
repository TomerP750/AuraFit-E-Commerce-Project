export class Material {
    id: number
    name: string
    materialPercent: number

    constructor(id: number, name:string, materialPercent: number ) {
        this.id = id
        this.name = name
        this.materialPercent = materialPercent
    }
}