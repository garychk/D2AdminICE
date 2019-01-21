import util from '@/libs/util.js'
import { TenantGetAll,TenantGet,TenantDel,TenantCreate } from '@/api/sys/Tenant'

export default {
    namespaced: true,
    actions: {
        GetAll({ dispatch },{
            vm,
            skipCount,
            maxResultCount
        }){
            let result=[]
            TenantGetAll({
                SkipCount: skipCount,
                MaxResultCount: maxResultCount
            }).then(async res => {
                result = res.result
                console.log(res)
              })
              .catch(err => {
                console.log('err: ', err)
              })
              return result
        }
    }
}