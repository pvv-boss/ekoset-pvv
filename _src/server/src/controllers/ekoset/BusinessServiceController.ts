
import { JsonController, Get, Res, Param, Body, Put, Delete } from 'routing-controllers';
import { Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { BusinessService } from '@/entities/ekoset/BusinessService';

@JsonController()
export default class BusinessServiceController extends BaseController {

  @Get('/services')
  public async getAll (
    @Res() response: Response) {
    const result = await ServiceContainer.BusinessServiceService.getAll();
    return BusinessServiceController.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/services')
  public async getAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.BusinessServiceService.getAllBySiteSectionId(siteSectionId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/:activityType/services')
  public async getByActivityAndBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @Param('activityType') activityTypeId: number) {
    const result = await ServiceContainer.BusinessServiceService.getByActivityAndBySiteSectionId(siteSectionId, activityTypeId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/clients/:clientType/services')
  public async getByClientTypeAndBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @Param('clientType') clientTypeId: number) {
    const result = await ServiceContainer.BusinessServiceService.getByClientTypeAndBySiteSectionId(siteSectionId, clientTypeId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/clients/services')
  public async getForClientBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.BusinessServiceService.getForClientBySiteSectionId(siteSectionId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/business/services')
  public async getForBusinessBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.BusinessServiceService.getForClientBySiteSectionId(siteSectionId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/services/:service/children')
  public async getChildServicesByParentId (
    @Res() response: Response,
    @Param('service') parentServiceId: number) {
    const result = await ServiceContainer.BusinessServiceService.getChildServicesByParentId(parentServiceId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Get('/services/:service')
  public async getById (
    @Res() response: Response,
    @Param('service') serviceId: number,
  ) {
    const result = await ServiceContainer.BusinessServiceService.getById(serviceId);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Put('/services')
  public async save (
    @Body() businessService: BusinessService,
    @Res() response: Response) {
    const result = await ServiceContainer.BusinessServiceService.save(businessService);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Delete('/services/:id(\\d+)')
  public async delete (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceContainer.BusinessServiceService.delete(id);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

}