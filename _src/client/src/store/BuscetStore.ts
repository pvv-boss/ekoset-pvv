import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator';
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'
import Cookies from 'js-cookie';
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem';

@Module({
  name: 'BuscetStore',
  stateFactory: true,
  namespaced: true
})
export default class BuscetStore extends VuexModule {
  private isStoreInitialized = false
  private cookieBusctetStoreName = 'ekoset_busket_store'
  private addedServiceListState: BusinessServiceLocalStorageItem[] = []

  @VuexMutation
  public addServiceMutation (businessService: BusinessServiceLocalStorageItem) {
    this.addedServiceListState.push(businessService)
  }

  @VuexMutation
  public removeServiceMutation (businessService: BusinessServiceLocalStorageItem) {

    const index = findAddedServiceIndex(this.addedServiceListState, businessService)
    this.addedServiceListState.splice(index, 1)

    Cookies.set(this.cookieBusctetStoreName, this.addedServiceListState, { expires: 10 })

  }

  @VuexMutation
  public setStoreInitialized () {
    this.isStoreInitialized = true
  }

  @VuexAction
  public initServiceList () {
    if (!this.storeInitialized) {
      const cookStr = Cookies.get(this.cookieBusctetStoreName)
      if (cookStr) {
        try {
          const serviceArray = JSON.parse(cookStr)
          if (serviceArray) {
            serviceArray.forEach((element) => {
              this.addServiceMutation(element)
            });
          }
        } catch (err) {
        } finally {
          this.setStoreInitialized()
        }
      }
    }
  }

  @VuexAction
  public addService (businessService: BusinessServiceLocalStorageItem) {
    if (findAddedServiceIndex(this.addedServiceList, businessService) === -1) {
      this.addServiceMutation(businessService)
      Cookies.set(this.cookieBusctetStoreName, this.addedServiceList, { expires: 10 })
      BrcDialogPlugin.showNotify(BrcDialogType.Info, 'ЭКОСЕТЬ', 'Добавлено в корзину. <br> Можете отправить заказ', 1500, { position: BrcDialogPosition.Central })
    } else {
      BrcDialogPlugin.showNotify(BrcDialogType.Info, 'ЭКОСЕТЬ', 'Вы уже добавили это в корзину', 1500, { position: BrcDialogPosition.Central })
    }
  }


  @VuexAction
  public removeService (businessService: BusinessServiceLocalStorageItem) {
    this.removeServiceMutation(businessService)
  }

  public get addedServiceList (): BusinessServiceLocalStorageItem[] {
    return this.addedServiceListState
  }

  public get addedServiceListAsText () {
    const names: string[] = []
    if (this.addedServiceList) {
      this.addedServiceList.forEach((iterServ) => {
        names.push(iterServ.serviceName)
      })
    }
    return names.length > 0 ? names.join('; ') : 'не выбрано'
  }

  public get addedServiceCount (): number {
    return this.addedServiceListState.length
  }

  public get storeInitialized () {
    return this.isStoreInitialized
  }

}

export const findAddedServiceIndex = (addedServiceList: BusinessServiceLocalStorageItem[], businessService: BusinessServiceLocalStorageItem) => {
  const index = addedServiceList.findIndex((iterElement) => {
    return iterElement.serviceName === businessService.serviceName && iterElement.serviceUrl === businessService.serviceUrl
  })
  return index
}

