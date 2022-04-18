export class LocalStorageUtils {

  public obterUsuario(): any {

    const res = localStorage.getItem('user');

    if (res) {
      console.log(res, '[res]');
      

      return JSON.parse(res);
    }
    else {
      return null;
    }
  }

  public salvarDadosLocaisUsuario(response: any): void {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public obterTokenUsuario(): string | null {
    return localStorage.getItem('token');
  }

  public salvarTokenUsuario(token: string): void {
    localStorage.setItem('token', token);
  }

  public salvarUsuario(user: string): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
