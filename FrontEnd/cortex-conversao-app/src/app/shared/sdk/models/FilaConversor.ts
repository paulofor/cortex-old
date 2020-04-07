/* tslint:disable */

declare var Object: any;
export interface FilaConversorInterface {
  "posicao"?: number;
  "moedaOrigem"?: string;
  "moedaFinal"?: string;
  "valorDesejado"?: number;
  "dataCotacao"?: string;
  "dataHoraCriacao"?: Date;
  "id"?: number;
}

export class FilaConversor implements FilaConversorInterface {
  "posicao": number;
  "moedaOrigem": string;
  "moedaFinal": string;
  "valorDesejado": number;
  "dataCotacao": string;
  "dataHoraCriacao": Date;
  "id": number;
  constructor(data?: FilaConversorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FilaConversor`.
   */
  public static getModelName() {
    return "FilaConversor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FilaConversor for dynamic purposes.
  **/
  public static factory(data: FilaConversorInterface): FilaConversor{
    return new FilaConversor(data);
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
      name: 'FilaConversor',
      plural: 'FilaConversors',
      path: 'FilaConversors',
      idName: 'id',
      properties: {
        "posicao": {
          name: 'posicao',
          type: 'number'
        },
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
