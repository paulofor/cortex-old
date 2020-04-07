/* tslint:disable */

declare var Object: any;
export interface ConversorInterface {
  "moedaOrigem"?: string;
  "moedaFinal"?: string;
  "valorDesejado"?: number;
  "dataCotacao"?: string;
  "totalPrecoCompra"?: number;
  "totalPrecoVenda"?: number;
  "dataHoraCriacao"?: Date;
  "id"?: number;
}

export class Conversor implements ConversorInterface {
  "moedaOrigem": string;
  "moedaFinal": string;
  "valorDesejado": number;
  "dataCotacao": string;
  "totalPrecoCompra": number;
  "totalPrecoVenda": number;
  "dataHoraCriacao": Date;
  "id": number;
  constructor(data?: ConversorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversor`.
   */
  public static getModelName() {
    return "Conversor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversor for dynamic purposes.
  **/
  public static factory(data: ConversorInterface): Conversor{
    return new Conversor(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Conversor',
      plural: 'Conversors',
      path: 'Conversors',
      idName: 'id',
      properties: {
        "moedaOrigem": {
          name: 'moedaOrigem',
          type: 'string'
        },
        "moedaFinal": {
          name: 'moedaFinal',
          type: 'string'
        },
        "valorDesejado": {
          name: 'valorDesejado',
          type: 'number'
        },
        "dataCotacao": {
          name: 'dataCotacao',
          type: 'string'
        },
        "totalPrecoCompra": {
          name: 'totalPrecoCompra',
          type: 'number'
        },
        "totalPrecoVenda": {
          name: 'totalPrecoVenda',
          type: 'number'
        },
        "dataHoraCriacao": {
          name: 'dataHoraCriacao',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
