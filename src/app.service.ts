import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import getSearchUrl from './utils/getSearchUrl';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async search(query: string) {
    if (!query) {
      throw new BadRequestException({
        error: 'Query is required',
      });
    }

    const { data: body } = await firstValueFrom(
      this.httpService.get(getSearchUrl(query), {
        headers: {
          'Content-Type':
            'X-Requested-With, X-SupplierId, X-UserId, X-Debug-Mode, X-Debug-Supplier-ID, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header, Wb-AppType, Wb-AppVersion',
        },
      }),
    );
    const promoProducts = body.data.products
      .filter((p) => p.isNew || p.panelPromoId)
      .map((o, i) => ({
        brand: o.brand,
        place: i,
      }));

    return promoProducts;
  }
}
