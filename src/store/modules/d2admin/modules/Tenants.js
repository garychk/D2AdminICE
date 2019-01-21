import util from '@/libs/util.js'
import { TenantGetAll, TenantGet, TenantDel, TenantCreate } from '@/api/sys/Tenant'

export default {
    namespaced: true,
    actions: {
        GetAll({ dispatch }, {
            vm,
            skipCount,
            maxResultCount
        }) {
            return TenantGetAll({
                SkipCount: skipCount,
                MaxResultCount: maxResultCount
            }).catch(err => {
                console.log('err: ', err)
            })
        }
    }
}