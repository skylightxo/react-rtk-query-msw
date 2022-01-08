import { chance } from "./chanceSingleton";

export class DataGenerator {
    private chance: typeof chance;
    public data: Array<any> = [];

    constructor(){
        this.chance = chance;
    }

    public generate(qty: number = 1): Array<any[]>{
        for(let i = 0; i <= qty; i++){
            this.data.push({ 
                name: this.chance.name,
                address: this.chance.address,
                company: this.chance.company,
                yearsOfExperience: this.chance.d20,
                timezone: this.chance.timezone,
                age: this.chance.age,
                profession: this.chance.profession,
                phone: this.chance.phone,
                bio: this.chance.paragraph
            });
        }
        return this.data;
    }
}