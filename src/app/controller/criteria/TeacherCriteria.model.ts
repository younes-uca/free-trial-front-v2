
import {BaseCriteria} from './BaseCriteria.model';

export class TeacherCriteria  extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
    public email: string;
    public emailLike: string;
    public phone: string;
    public phoneLike: string;

}
