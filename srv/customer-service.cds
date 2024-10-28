using {com.logali as logali} from '../db/schema';

service SaleOrder {

    entity zorden_jh as projection on logali.zorden_jh;
    entity zitems_jh as projection on logali.zitems_jh;

}
