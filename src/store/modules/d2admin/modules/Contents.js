import util from '@/libs/util.js'
import { ContentGetAll,ContentGet,ContentDel,ContentCreateOrUpdate } from '@/api/sys/Contents'

export default {
    namespaced: true,
    actions: {
        GetAll(vm,data){ 
            let result = {
                all:[],
                inreview:[],
                released:[],
                rejected:[]
            }           
            ContentGetAll(data).then(async res => {
                //console.log(res)
                result.all = res.result                             
              })
              .catch(err => {
                console.log('err: ', err)
              })
              
              return result;
        },
        GetList(vm,data){                     
            return ContentGetAll(data)
        },
        Get(vm,data){                     
            return ContentGet(data)
        },
        CreateOrUpdate(vm, data){
            return ContentCreateOrUpdate(data).catch(err => {
                console.log('err: ', err)
            })
        },
        Del(vm, data){
            return ContentDel(data).catch(err => {
                console.log('err: ', err)
            })
        }
    }
}