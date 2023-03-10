
import {BaseCriteria} from './BaseCriteria.model';

export class StatutFreeTrialCriteria  extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
    public style: string;
    public styleLike: string;

}
