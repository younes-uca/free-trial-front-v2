
import {BaseCriteria} from './BaseCriteria.model';

export class FreeTrialConfigurationCriteria  extends BaseCriteria {

    public id: number;
    public dateApplicationDebut: Date;
    public dateApplicationDebutFrom: Date;
    public dateApplicationDebutTo: Date;
    public dateApplicationFin: Date;
    public dateApplicationFinFrom: Date;
    public dateApplicationFinTo: Date;
     public nombreStudentMax: number;
     public nombreStudentMaxMin: number;
     public nombreStudentMaxMax: number;
     public nombreStudentMin: number;
     public nombreStudentMinMin: number;
     public nombreStudentMinMax: number;

}
