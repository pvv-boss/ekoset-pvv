import { JsonController, UseBefore, Post, Req, Res, Param, Body, Get, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import multer from 'multer';
import SiteDocument from '@/entities/ekoset/SiteDocument';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import MediaService from '@/services/ekoset/MediaService';


const upload = multer();

@JsonController()
export default class MediaController extends BaseController {


  @Get('/banners/main')
  public async getBannersForMainPage (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MediaService).getBannersForMainPage();
    return this.createSuccessResponse(result, response);
  }

  @Get('/banners/sitesection/:siteSectionId')
  public async getBannersForSiteSection (
    @Res() response: Response,
    @Param('siteSectionId') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(MediaService).getBannersForSiteSection(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/sitesection/:sitesectionId/image/:bigOrSmall(big|small)')
  public async saveSiteSectionImage (
    @Param('sitesectionId') siteSectionId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveSiteSectionImage(siteSectionId, file, bigOrSmall === 'big');
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/sitesection/:sitesectionId/image/logo')
  public async saveSiteSectionLogo (
    @Param('sitesectionId') siteSectionId: number,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveSiteSectionLogo(siteSectionId, file);
    return this.createSuccessResponse(result, response);
  }


  @UseBefore(upload.single('file'))
  @Post('/admin/panel/service/:serviceId/image/:bigOrSmall(big|small)')
  public async saveServiceImage (
    @Param('serviceId') serviceId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveServiceImage(serviceId, file, bigOrSmall === 'big');
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/offer/:offerId/image/:bigOrSmall(big|small)')
  public async saveOfferImage (
    @Param('offerId') offerId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveOfferImage(offerId, file, bigOrSmall === 'big');
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/brands/:brandId/image/:bigOrSmall(big|small)')
  public async saveBrandImage (
    @Param('brandId') brandId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveBrandImage(brandId, file, bigOrSmall === 'big');
    return this.createSuccessResponse(result, response);
  }


  @UseBefore(upload.single('file'))
  @Post('/admin/panel/news/:newsId/image/:bigOrSmall(big|small)')
  public async saveNewsImage (
    @Param('newsId') brandId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveNewsImage(brandId, file, bigOrSmall === 'big');
    return this.createSuccessResponse(result, response);
  }


  @UseBefore(upload.single('file'))
  @Post('/admin/panel/recommendation/:id/image')
  public async saveRecommendationLetterImage (
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveRecommendationLetterImage(id, file);
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/sitepage/:sitePageId/image')
  public async saveSitePageImage (
    @Param('sitePageId') id: number,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveSitePageImage(id, file);
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/sitepage/:sitePageId/logo')
  public async saveSitePageLogo (
    @Param('sitePageId') id: number,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveSitePageLogo(id, file);
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/clActivities/:id/mainclientlogo')
  public async saveClActivityMainClientLogo (
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceRegistry.instance.getService(MediaService).saveClActivityMainClientLogo(id, file);
    return this.createSuccessResponse(result, response);
  }


  @Get('/admin/documents')
  public async getSiteDocuments (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(MediaService).getSiteDocuments();
    return this.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/document/:id')
  public async addSiteDocument (
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response
  ) {

    const file = request.file;
    await ServiceRegistry.instance.getService(MediaService).addSiteDocument(file, id);
    return this.createSuccessResponse({}, response);
  }

  @Post('/admin/document')
  public async saveSiteDocument (
    @Body() siteDocument: SiteDocument,
    @Req() request: Request,
    @Res() response: Response
  ) {
    await ServiceRegistry.instance.getService(MediaService).saveSiteDocument(siteDocument);
    return this.createSuccessResponse({}, response);
  }

  @Delete('/admin/document/:id')
  public async deleteSiteDocument (
    @Res() response: Response,
    @Param('id') id: number
  ) {
    await ServiceRegistry.instance.getService(MediaService).deleteSiteDocument(id);
    return this.createSuccessResponse({}, response);
  }

  // @UseBefore(upload.single('file'))
  // @Post('/admin/export/pdf')
  // @OnUndefined(200)
  // public async exportHtml2Pdf (
  //   @Req() request: Request,
  //   @Res() response: Response) {

  //   const file = request.file;
  //   const htmlContent = file.buffer.toString();
  //   const regexp = /<div.*?Trial.*?<\/div>/gm
  //   const htmlContentWithoutTrial = htmlContent.replace(regexp, '')

  //   const options = {
  //     format: 'A4',
  //     margin: {
  //       top: '15mm',            // default is 0, units: mm, cm, in, px
  //       right: '10mm',
  //       bottom: '15mm',
  //       left: '15mm'
  //     }, timeout: 1000000
  //   };


  //   const callback = (pdf) => {
  //     response.setHeader('Content-Type', 'application/pdf');
  //     response.send(pdf);
  //   }

  //   await this.convertHTMLToPDF(htmlContentWithoutTrial, callback, options, null, false);
  //   return response;
  // }


  // public convertHTMLToPDF = async (html, callback, options = null, puppeteerArgs = null, remoteContent = true) => {
  //   if (typeof html !== 'string') {
  //     throw new Error(
  //       'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
  //     );
  //   }

  //   // Это в дефолтные параметры puppeteerArgs
  //   // userDataDir: './data',

  //   let browser: Browser;
  //   if (puppeteerArgs) {
  //     browser = await puppeteer.launch(puppeteerArgs);
  //   } else {
  //     browser = await puppeteer.launch();
  //   }

  //   const page = await browser.newPage();

  //   if (remoteContent === true) {
  //     await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
  //       waitUntil: 'networkidle0'
  //     });
  //   } else {
  //     await page.setContent(html);
  //   }

  //   await page.pdf(options).then(callback, (error) => {
  //     logger.error(error);
  //   });
  //   await browser.close();
  // };

}

