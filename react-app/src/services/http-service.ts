import apiClient from "./api-client";

interface Entity {
  id: number;
}

//o getAll<T> vai receber a classe que lhe passarmos noutros locais, o T é um type Generic
class HttpService {
  endpoint: string;

  //no typescript podemos criar construtores, assim podemos inicializar o endpoint
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  //aqui estamos a dizer que a classe T deve ter as propriedades que se encontram na classe Entity
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, { entity });
  }
}

//criamos uma função porque não podemos inicializar uma classe HttpService com um valor pre definido
const create = (endpoint: string) => new HttpService(endpoint);

export default create;
