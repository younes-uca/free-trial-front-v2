
import {BaseCriteria} from './BaseCriteria.model';

export class ServicesCriteria  extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;

}
