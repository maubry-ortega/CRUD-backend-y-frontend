import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PersonalizaIntlService extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementos por página';
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primera página';
  lastPageLabel = 'Última página';
}
